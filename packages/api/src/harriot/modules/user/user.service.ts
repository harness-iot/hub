import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CrudService } from '@harriot-core/database/crud.service';
import { HARRIOT_DB } from '@harriot-core/database/database.constants';
import { UserEntity } from '@harriot-hub/common';

import { HarriotRoleEntity } from '../role/role.entity';

@Injectable()
export class HarriotUserService extends CrudService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity, HARRIOT_DB)
    protected readonly repository: Repository<UserEntity>,
  ) {
    super();
  }

  public async create(
    user_id: string,
    role: HarriotRoleEntity,
  ): Promise<UserEntity> {
    const user = new UserEntity();
    user.user_id = user_id;
    user.role = role;
    return this.repository.save(user);
  }
}
