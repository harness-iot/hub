import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MycodoCrudService } from '@harriot-mycodo/database/crud.service';
import { MYCODO_DB } from '@harriot-mycodo/database/database.constants';

import { MycodoUserEntity } from './user.entity';

@Injectable()
export class MycodoUserService extends MycodoCrudService<MycodoUserEntity> {
  constructor(
    @InjectRepository(MycodoUserEntity, MYCODO_DB)
    protected readonly repository: Repository<MycodoUserEntity>,
  ) {
    super(repository);
  }

  async createAdmin(
    hubInstanceSecret: string,
    api_key: Buffer,
  ): Promise<MycodoUserEntity> {
    try {
      const user = new MycodoUserEntity();
      user.unique_id = hubInstanceSecret;
      user.api_key = api_key;
      user.name = hubInstanceSecret;
      user.role_id = 1;
      return this.repository.save(user);
    } catch (err) {
      console.error('[MycodoUserService.createAdmin]', err);
      throw err;
    }
  }
}
