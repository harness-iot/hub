import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NodeChannelEntity } from '../../entities';
import { SqliteCrudService } from '../../services';

@Injectable()
export class NodeChannelService extends SqliteCrudService<NodeChannelEntity> {
  constructor(
    @InjectRepository(NodeChannelEntity)
    protected readonly repository: Repository<NodeChannelEntity>,
  ) {
    super(repository);
  }
}
