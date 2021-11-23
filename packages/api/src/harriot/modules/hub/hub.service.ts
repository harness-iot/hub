import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CrudService } from '@harriot-core/database/crud.service';
import { HARRIOT_DB } from '@harriot-core/database/database.constants';

import { HarriotHubEntity } from './hub.entity';

@Injectable()
export class HarriotHubService extends CrudService<HarriotHubEntity> {
  constructor(
    @InjectRepository(HarriotHubEntity, HARRIOT_DB)
    protected readonly repository: Repository<HarriotHubEntity>,
  ) {
    super();
  }
}
