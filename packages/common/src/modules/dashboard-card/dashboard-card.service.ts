import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DashboardCardEntity } from '../../entities';
import { SqliteCrudService } from '../../services';

@Injectable()
export class DashboardCardEntityService extends SqliteCrudService<DashboardCardEntity> {
  constructor(
    @InjectRepository(DashboardCardEntity)
    protected readonly repository: Repository<DashboardCardEntity>,
  ) {
    super(repository);
  }

  public createQueryBuilder(name: string) {
    return this.repository.createQueryBuilder(name);
  }
}
