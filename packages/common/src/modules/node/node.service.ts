import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NodeEntity } from '../../entities';
import { SqliteCrudService } from '../../services';

@Injectable()
export class NodeEntityService extends SqliteCrudService<NodeEntity> {
  constructor(
    @InjectRepository(NodeEntity)
    protected readonly repository: Repository<NodeEntity>,
  ) {
    super(repository);
  }
}
