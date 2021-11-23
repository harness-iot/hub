import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MycodoCrudService } from '@harriot-mycodo/database/crud.service';
import { MYCODO_DB } from '@harriot-mycodo/database/database.constants';

import { MycodoConversionEntity } from './conversion.entity';

@Injectable()
export class MycodoConversionService extends MycodoCrudService<MycodoConversionEntity> {
  constructor(
    @InjectRepository(MycodoConversionEntity, MYCODO_DB)
    protected readonly repository: Repository<MycodoConversionEntity>,
  ) {
    super(repository);
  }
}
