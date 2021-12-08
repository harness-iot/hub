import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SqliteCrudService } from '@harriot-db/sqlite/sqlite-crud.service';
import { RoleEntity, UserEntity } from '@harriot-hub/common';

@Injectable()
export class UserService extends SqliteCrudService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    protected readonly repository: Repository<UserEntity>,
  ) {
    super();
  }

  public async create(user_id: string, role: RoleEntity): Promise<UserEntity> {
    const user = new UserEntity();
    user.user_id = user_id;
    user.role = role;
    return this.repository.save(user);
  }
}
