import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CrudService } from '@harriot-core/database/crud.service';
import { HARRIOT_DB } from '@harriot-core/database/database.constants';

import { HarriotRoleEntity } from '../role/role.entity';

import { HarriotUserEntity } from './user.entity';

@Injectable()
export class HarriotUserService extends CrudService<HarriotUserEntity> {
  constructor(
    @InjectRepository(HarriotUserEntity, HARRIOT_DB)
    protected readonly repository: Repository<HarriotUserEntity>,
  ) {
    super();
  }

  public async create(
    user_id: string,
    role: HarriotRoleEntity,
  ): Promise<HarriotUserEntity> {
    const user = new HarriotUserEntity();
    user.user_id = user_id;
    user.role = role;
    return this.repository.save(user);
  }
}
