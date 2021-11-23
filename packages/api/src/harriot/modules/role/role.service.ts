import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CrudService } from '@harriot-core/database/crud.service';
import { HARRIOT_DB } from '@harriot-core/database/database.constants';

import { HarriotRoleEntity } from './role.entity';

@Injectable()
export class HarriotRoleService extends CrudService<HarriotRoleEntity> {
  constructor(
    @InjectRepository(HarriotRoleEntity, HARRIOT_DB)
    protected readonly repository: Repository<HarriotRoleEntity>,
  ) {
    super(repository);
  }
}
