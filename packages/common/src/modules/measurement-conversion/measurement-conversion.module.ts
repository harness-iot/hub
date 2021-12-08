import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MeasurementConversionEntity } from '../../entities';

import { MeasurementConversionEntityService } from './measurement-conversion.service';

@Module({
  imports: [TypeOrmModule.forFeature([MeasurementConversionEntity])],
  providers: [MeasurementConversionEntityService],
  exports: [MeasurementConversionEntityService],
})
export class MeasurementConversionEntityModule {}
