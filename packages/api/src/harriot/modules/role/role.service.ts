import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CrudService } from '@harriot-core/database/crud.service';
import { HARRIOT_DB } from '@harriot-core/database/database.constants';
import { RoleEntity } from '@harriot-hub/common';

@Injectable()
export class HarriotRoleService extends CrudService<RoleEntity> {
  constructor(
    @InjectRepository(RoleEntity, HARRIOT_DB)
    protected readonly repository: Repository<RoleEntity>,
  ) {
    super(repository);
  }
}
