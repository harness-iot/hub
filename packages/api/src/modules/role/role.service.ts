import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SqliteCrudService } from '@harriot-db/sqlite/sqlite-crud.service';
import { RoleEntity } from '@harriot-hub/common';

@Injectable()
export class RoleService extends SqliteCrudService<RoleEntity> {
  constructor(
    @InjectRepository(RoleEntity)
    protected readonly repository: Repository<RoleEntity>,
  ) {
    super(repository);
  }
}
