import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MeasurementConversionEntity } from '../../entities';
import { SqliteCrudService } from '../../services';

@Injectable()
export class MeasurementConversionService extends SqliteCrudService<MeasurementConversionEntity> {
  constructor(
    @InjectRepository(MeasurementConversionEntity)
    protected readonly repository: Repository<MeasurementConversionEntity>,
  ) {
    super(repository);
  }
}
