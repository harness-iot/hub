import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MeasurementConversionEntity } from '../../entities';

import { MeasurementConversionService } from './measurement-conversion.service';

@Module({
  imports: [TypeOrmModule.forFeature([MeasurementConversionEntity])],
  providers: [MeasurementConversionService],
  exports: [MeasurementConversionService],
})
export class MeasurementConversionModule {}
