import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { MYCODO_DB } from '@harriot-mycodo/database/database.constants';

import { MycodoDisplayOrderEntity } from './display-order.entity';

type EntityOption =
  | 'dashboard'
  | 'function'
  | 'inputs'
  | 'lcd'
  | 'math'
  | 'method'
  | 'output'
  | 'remote_host'
  | 'timer';

@Injectable()
export class MycodoDisplayOrderService {
  constructor(
    @InjectRepository(MycodoDisplayOrderEntity, MYCODO_DB)
    protected readonly repository: Repository<MycodoDisplayOrderEntity>,
  ) {}

  public async create(
    entity: EntityOption,
    unique_id: string,
    transaction: EntityManager,
  ): Promise<MycodoDisplayOrderEntity> {
    // I think it would always be id=1?
    const display_order = await this.repository.findOne(1);

    if (!display_order) {
      throw Error('Failed to find displayorder');
    }

    if (!display_order[entity].trim()) {
      display_order[entity] = unique_id;
    } else {
      const entries = display_order[entity].split(',');
      display_order[entity] = [...entries, unique_id].join(',');
    }
    return transaction.save(display_order);
  }

  public async delete(
    entity: EntityOption,
    unique_id: string,
    transaction: EntityManager,
  ): Promise<MycodoDisplayOrderEntity> {
    // I think it would always be id=1?
    const display_order = await this.repository.findOne(1);

    if (!display_order) {
      throw Error('Failed to find displayorder');
    }

    const entries = display_order[entity].split(',');
    display_order[entity] = entries
      .filter((entry) => entry !== unique_id)
      .join(',');
    return transaction.save(display_order);
  }
}
