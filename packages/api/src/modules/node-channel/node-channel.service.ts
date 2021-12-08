import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SqliteCrudService } from '@harriot-db/sqlite/sqlite-crud.service';
import { NodeChannelEntity } from '@harriot-hub/common';

@Injectable()
export class NodeChannelService extends SqliteCrudService<NodeChannelEntity> {
  constructor(
    @InjectRepository(NodeChannelEntity)
    protected readonly repository: Repository<NodeChannelEntity>,
  ) {
    super(repository);
  }
}
