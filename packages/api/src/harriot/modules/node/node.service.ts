import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CrudService } from '@harriot-core/database/crud.service';
import { HARRIOT_DB } from '@harriot-core/database/database.constants';
import { NodeEntity } from '@harriot-hub/common';

@Injectable()
export class HarriotNodeService extends CrudService<NodeEntity> {
  constructor(
    @InjectRepository(NodeEntity, HARRIOT_DB)
    protected readonly repository: Repository<NodeEntity>,
  ) {
    super(repository);
  }
}
