import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MycodoCrudService } from '@harriot-mycodo/database/crud.service';
import { MYCODO_DB } from '@harriot-mycodo/database/database.constants';

import { MycodoRoleEntity } from './role.entity';

@Injectable()
export class MycodoRoleService extends MycodoCrudService<MycodoRoleEntity> {
  constructor(
    @InjectRepository(MycodoRoleEntity, MYCODO_DB)
    protected readonly repository: Repository<MycodoRoleEntity>,
  ) {
    super(repository);
  }
}
