import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, EntityManager, Repository } from 'typeorm';

import {
  CreateNodeChannel,
  CreateNodeInput,
  CreateNodeMeasurement,
} from '@harriot-api/modules/node/inputs/create.input';
import { MycodoCrudService } from '@harriot-mycodo/database/crud.service';
import { MYCODO_DB } from '@harriot-mycodo/database/database.constants';

import { MycodoInputChannelEntity } from './input-channel.entity';

@Injectable()
export class MycodoInputChannelService extends MycodoCrudService<MycodoInputChannelEntity> {
  constructor(
    @InjectRepository(MycodoInputChannelEntity, MYCODO_DB)
    protected readonly repository: Repository<MycodoInputChannelEntity>,
  ) {
    super(repository);
  }

  public async create(
    node: CreateNodeInput,
    measurement: CreateNodeMeasurement,
    transaction: EntityManager,
  ): Promise<void> {
    // For input nodes, most channel detail is populated from measurements array
    // with exception of custom_fields
    const input_channel = new MycodoInputChannelEntity();
    input_channel.input_id = node.public_key;
    input_channel.name = measurement.name;

    const channel = node.channels.find(
      (ch) => ch.channel === measurement.channel,
    );

    const existing_custom_options =
      channel && channel.custom_fields ? JSON.parse(channel.custom_fields) : {};

    input_channel.custom_options = JSON.stringify({
      subscribe_topic: `node/${measurement.channel}/${node.secret_key}`,
      ...existing_custom_options,
    });
    input_channel.channel = measurement.channel;
    await transaction.save(input_channel);
  }

  public async deleteByInputId(
    input_id: string,
    transaction: EntityManager,
  ): Promise<DeleteResult> {
    return transaction.delete(MycodoInputChannelEntity, { input_id });
  }
}
