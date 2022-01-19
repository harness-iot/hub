import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-core';
import { Connection } from 'typeorm';

import {
  getMeasurementByKey,
  NodeChannelEntity,
  NodeEntity,
  NodeEntityService,
  NodeStatusDto,
  NodeTypeEnum,
  RedisService,
} from '@harriot-hub/common';
import { NodeSettingsFieldDto } from '@harriot-hub/common/dist/dto/node-settings.dto';

import { CreateNodeChannel, CreateNodeInput } from './inputs/create.input';
import { UpdateNodeNicknameInput } from './inputs/update-nickname.input';
import { UpdateNodeSettingInput } from './inputs/update-settings.input';
import { UpdateNodeStatusInput } from './inputs/update-status.input';

@Injectable()
export class NodeRouteService {
  constructor(
    @InjectConnection() private connection: Connection,
    protected readonly nodeService: NodeEntityService,
    protected readonly redisService: RedisService,
  ) {}

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
      const measurement = getMeasurementByKey(input.measurement_key);

      const channel = new NodeChannelEntity();
      channel.name = NodeRouteService.createChannelName(
        input,
        node.type,
        measurement.name,
      );
      channel.measurement_key = input.measurement_key;
      channel.default_measurement_unit = measurement.units[0];
      channel.channel = input.channel;
      channel.settings = input.settings;
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
      node.id = input.instance_key;
      node.public_key = input.public_key;
      node.name = input.model_name;
      node.nickname = input.nickname;
      node.icon = input.icon;
      node.type = input.type;
      node.settings = input.settings;
      const savedNode = await queryRunner.manager.save(node);

      // Set input settings at node level
      // if (input.type === NodeTypeEnum.INPUT) {
      //   const inputSettings = new NodeInputSettingsEntity();
      //   inputSettings.node = savedNode;
      //   await queryRunner.manager.save(inputSettings);
      // }

      const nodeChannels = await Promise.all(
        input.channels.map(async (inputChannel) => {
          const channel = await this.createChannel(inputChannel, savedNode);
          const savedChannel = await queryRunner.manager.save(channel);

          // Set output settings at channel level
          // if (input.type === NodeTypeEnum.OUTPUT) {
          //   const outputSettings = new NodeOutputSettingsEntity();
          //   outputSettings.channel = inputChannel.channel;
          //   outputSettings.node = savedNode;
          //   await queryRunner.manager.save(outputSettings);
          // }

          return savedChannel;
        }),
      );

      await queryRunner.commitTransaction();

      return Object.assign(savedNode, { channels: nodeChannels });
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

  public async getNodeStatus(): Promise<NodeStatusDto[]> {
    const nodes = await this.redisService.getNodesStatus();
    return nodes;
  }

  public async find(): Promise<Partial<NodeEntity>[]> {
    try {
      const nodes = await this.nodeService.find();
      return nodes;
    } catch (err) {
      Logger.error(`[${NodeRouteService.name}].findAll`, err);
      throw Error(err);
    }
  }

  public async findAll(): Promise<NodeEntity[]> {
    return this.nodeService
      .createQueryBuilder('nodes')
      .innerJoinAndSelect('nodes.channels', 'channels')
      .leftJoinAndSelect('channels.conversion', 'conversion')
      .getMany();
  }

  public async updateSettings(
    id: string,
    input: UpdateNodeSettingInput[],
  ): Promise<NodeEntity> {
    const node = await this.nodeService.findOne({ where: { id } });

    if (!node) {
      throw Error(`Failed to find node with id: ${id}`);
    }

    const settings = JSON.parse(node.settings_raw) as NodeSettingsFieldDto[];

    // Validate incoming settings - make sure they exist
    input.forEach((field) => {
      const fieldExists = settings.find((setting) => setting.id === field.id);
      if (!fieldExists) {
        throw Error(
          `Attempted to update node settings field that does not exist: ${field.id}`,
        );
      }
    });

    const updatedSettings = settings.map((setting) => {
      const settingField = input.find((field) => field.id === setting.id);
      if (settingField) {
        return {
          ...setting,
          value: settingField.value,
        };
      }
      return setting;
    });

    node.settings_raw = JSON.stringify(updatedSettings);
    return this.nodeService.save(node);
  }
}
