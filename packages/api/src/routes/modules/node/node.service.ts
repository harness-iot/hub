import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectConnection } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-core';
import { Connection } from 'typeorm';

import {
  getMeasurementByKey,
  NodeChannelEntity,
  NodeEntity,
  NodeEntityService,
  nodeSettingsMqttFormat,
  NodeStatusDto,
  NodeTypeEnum,
  RedisService,
  NodeSettingsFieldDto
} from '@harriot-hub/common';
import { MQTT_PROVIDER } from '@harriot-mqtt/mqtt.constants';

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
    @Inject(MQTT_PROVIDER) private readonly client: ClientProxy,
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

  private static handleIncomingSettings = (
    existing: string,
    incoming: UpdateNodeSettingInput[],
  ): Promise<NodeSettingsFieldDto[]> => {
    return new Promise((resolve, reject) => {
      const existingSettings = JSON.parse(existing) as NodeSettingsFieldDto[];

      // Validate incoming settings - make sure they exist
      incoming.forEach((field) => {
        const fieldExists = existingSettings.find(
          (setting) => setting.id === field.id,
        );
        if (!fieldExists) {
          return reject(
            `Attempted to update node settings field that does not exist: ${field.id}`,
          );
        }
      });

      const updatedSettings = existingSettings.map((setting) => {
        const settingField = incoming.find((field) => field.id === setting.id);
        if (settingField) {
          return {
            ...setting,
            value: settingField.value,
          };
        }
        return setting;
      });

      return resolve(updatedSettings);
    });
  };

  public async updateSettings(
    id: string,
    input: UpdateNodeSettingInput[],
    channel_id?: string,
  ): Promise<NodeEntity> {
    const node = await this.nodeService.findOne({
      where: { id },
      relations: ['channels'],
    });

    if (!node) {
      throw Error(`Failed to find node with id: ${id}`);
    }

    if (channel_id) {
      const channelIndex = node.channels.findIndex(
        (channel) => channel.id === channel_id,
      );

      if (channelIndex < 0) {
        throw Error(
          `Failed to find channel (${channel_id}) on node (${node.id})`,
        );
      }

      const channel = node.channels[channelIndex];

      const updatedSettings = await NodeRouteService.handleIncomingSettings(
        channel.settings_raw,
        input,
      );

      // Need to include both formats to satisfy client caching and updating mqtt node
      node.channels[channelIndex].settings = updatedSettings;
      node.channels[channelIndex].settings_raw =
        JSON.stringify(updatedSettings);
    } else {
      const updatedSettings = await NodeRouteService.handleIncomingSettings(
        node.settings_raw,
        input,
      );

      // Need to include both formats to satisfy client caching and updating mqtt node
      node.settings = updatedSettings;
      node.settings_raw = JSON.stringify(updatedSettings);
    }

    const settings = nodeSettingsMqttFormat(node);

    // Update settings on node (if connected)
    this.client.send(`node/${node.id}`, { settings }).subscribe((value) => {
      if (value === 'received') {
        console.log('SETTING SUCCESSFULLY SENT!');
      }
    });

    return this.nodeService.save(node);
  }
}
