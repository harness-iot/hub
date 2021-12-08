import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SqliteCrudService } from '@harriot-db/sqlite/sqlite-crud.service';
import { NodeEntity } from '@harriot-hub/common';

@Injectable()
export class NodeService extends SqliteCrudService<NodeEntity> {
  constructor(
    @InjectRepository(NodeEntity)
    protected readonly repository: Repository<NodeEntity>,
  ) {
    super(repository);
  }
}
