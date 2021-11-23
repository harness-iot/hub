import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, EntityManager, Repository } from 'typeorm';

import {
  CreateNodeChannel,
  CreateNodeInput,
} from '@harriot-api/modules/node/inputs/create.input';
import { MQTT_BASE } from '@harriot-mycodo/constants/mqtt.constants';
import { MycodoCrudService } from '@harriot-mycodo/database/crud.service';
import { MYCODO_DB } from '@harriot-mycodo/database/database.constants';

import { MycodoOutputChannelEntity } from './output-channel.entity';

@Injectable()
export class MycodoOutputChannelService extends MycodoCrudService<MycodoOutputChannelEntity> {
  constructor(
    @InjectRepository(MycodoOutputChannelEntity, MYCODO_DB)
    protected readonly repository: Repository<MycodoOutputChannelEntity>,
  ) {
    super(repository);
  }

  public async create(
    node: CreateNodeInput,
    channel: CreateNodeChannel,
    transaction: EntityManager,
  ): Promise<void> {
    const output_channel = new MycodoOutputChannelEntity();
    output_channel.output_id = node.public_key;
    output_channel.name = channel.name;
    output_channel.channel = channel.channel; // Channel number - using array position
    const existing_custom_options = channel.custom_fields
      ? JSON.parse(channel.custom_fields)
      : {};

    const mqtt_config = {
      mqtt_clientid: `hub:${node.secret_key}`,
      mqtt_topic: `node/${node.secret_key}`,
      payload_on: `update:${channel.channel}:on`,
      payload_off: `update:${channel.channel}:off`,
      state_startup: 0,
      state_shutdown: 0,
      command_force: false,
      mqtt_use_tls: false,
      amps: 0.0,
      ...MQTT_BASE,
      ...existing_custom_options,
    };

    output_channel.custom_options = JSON.stringify(mqtt_config);
    await transaction.save(output_channel);
  }

  public async deleteByOutputId(
    output_id: string,
    transaction: EntityManager,
  ): Promise<DeleteResult> {
    return transaction.delete(MycodoOutputChannelEntity, { output_id });
  }
}
