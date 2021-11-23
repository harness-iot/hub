import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CrudService } from '@harriot-core/database/crud.service';
import { HARRIOT_DB } from '@harriot-core/database/database.constants';

import { HarriotNodeEntity } from './node.entity';

@Injectable()
export class HarriotNodeService extends CrudService<HarriotNodeEntity> {
  constructor(
    @InjectRepository(HarriotNodeEntity, HARRIOT_DB)
    protected readonly repository: Repository<HarriotNodeEntity>,
  ) {
    super(repository);
  }
}
