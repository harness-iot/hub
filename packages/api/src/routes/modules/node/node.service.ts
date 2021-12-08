import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-core';
import { Connection } from 'typeorm';

import {
  NodeChannelEntity,
  NodeEntity,
  NodeEntityService,
  NodeInputSettingsEntity,
  NodeOutputSettingsEntity,
  NodeTypeEnum,
  NODE_MEASUREMENTS,
} from '@harriot-hub/common';

import { CreateNodeChannel, CreateNodeInput } from './inputs/create.input';
import { UpdateNodeNicknameInput } from './inputs/update-nickname.input';
import { UpdateNodeStatusInput } from './inputs/update-status.input';

@Injectable()
export class NodeRouteService {
  constructor(
    @InjectConnection() private connection: Connection,
    protected readonly nodeService: NodeEntityService,
  ) {}

  private static findNodeMeasurement(key: string) {
    const measurement = NODE_MEASUREMENTS.find((m) => m.key === key);

    if (!measurement) {
      throw Error(`Node measurement not found by key: ${key}`);
    }

    return measurement;
  }

  private static createChannelName(
    channel: CreateNodeChannel,
    nodeType: NodeTypeEnum,
    measurementName: string,
  ) {
    // For output, channel name can be specified, defaults to 'Channel #'
    if (nodeType === NodeTypeEnum.OUTPUT) {
      if (channel.name) {
        return channel.name;
      }

      return `Channel ${channel.channel}`;
    }

    // For input, channel name is measurement name
    return measurementName;
  }

  private async createChannel(
    input: CreateNodeChannel,
    node: NodeEntity,
  ): Promise<NodeChannelEntity> {
    try {
      const measurement = NodeRouteService.findNodeMeasurement(
        input.measurement_key,
      );

      const channel = new NodeChannelEntity();
      channel.name = NodeRouteService.createChannelName(
        input,
        node.type,
        measurement.name,
      );
      channel.measurement_key = input.measurement_key;
      channel.channel = input.channel;
      channel.custom_options = input.custom_fields;
      channel.node = node;
      return channel;
    } catch (error) {
      throw error;
    }
  }

  public async create(input: CreateNodeInput): Promise<NodeEntity> {
    const queryRunner = this.connection.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      // Delete Node if it already exists - resetting
      const existing_node = await this.nodeService.findOne({
        where: { public_key: input.public_key },
      });

      if (existing_node) {
        await queryRunner.manager.remove(existing_node);
      }

      const node = new NodeEntity();
      node.id = input.secret_key; // to do: rename secret_key to instance_id
      node.public_key = input.public_key;
      node.secret_key = input.secret_key; // to do: remove
      node.name = input.model_name;
      node.nickname = input.nickname;
      node.icon = input.icon;
      node.type = input.type;
      const savedNode = await queryRunner.manager.save(node);

      // Set input settings at node level
      if (input.type === NodeTypeEnum.INPUT) {
        const inputSettings = new NodeInputSettingsEntity();
        inputSettings.node = savedNode;
        await queryRunner.manager.save(inputSettings);
      }

      await Promise.all(
        input.channels.map(async (inputChannel) => {
          const channel = await this.createChannel(inputChannel, savedNode);
          await queryRunner.manager.save(channel);

          // Set output settings at channel level
          if (input.type === NodeTypeEnum.OUTPUT) {
            const outputSettings = new NodeOutputSettingsEntity();
            outputSettings.channel = inputChannel.channel;
            outputSettings.node = savedNode;
            await queryRunner.manager.save(outputSettings);
          }
        }),
      );

      await queryRunner.commitTransaction();

      return savedNode;
    } catch (err) {
      await queryRunner.rollbackTransaction();

      if (err instanceof Error) {
        throw new ApolloError(err.message);
      } else {
        throw new ApolloError('internal server error');
      }
    } finally {
      await queryRunner.release();
    }
  }

  public async updateStatus(
    id: string,
    input: UpdateNodeStatusInput,
  ): Promise<NodeEntity> {
    const node = await this.nodeService.findOneOrFail({ where: { id } });
    node.is_enabled = input.is_enabled;
    return this.nodeService.save(node);
  }

  public async updateNickname(
    id: string,
    input: UpdateNodeNicknameInput,
  ): Promise<NodeEntity> {
    const node = await this.nodeService.findOneOrFail({ where: { id } });
    node.nickname = input.nickname;
    return this.nodeService.save(node);
  }

  public async find(): Promise<NodeEntity[]> {
    try {
      const nodes = await this.nodeService.find();
      return nodes;
    } catch (err) {
      Logger.error(`[${NodeRouteService.name}].findAll`, err);
      throw Error(err);
    }
  }

  public async findOneById(id: string): Promise<NodeEntity> {
    try {
      const node = await this.nodeService.findOne({
        where: { id },
      });
      return node;
    } catch (err) {
      Logger.error(`[${NodeRouteService.name}].findOneById`, err);
      throw Error(err);
    }
  }
}
