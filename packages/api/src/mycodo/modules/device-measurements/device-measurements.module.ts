import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MYCODO_DB } from '@harriot-mycodo/database/database.constants';
import { MycodoDatabaseModule } from '@harriot-mycodo/database/database.module';

import { MycodoDeviceMeasurementsEntity } from './device-measurements.entity';
import { MycodoDeviceMeasurementsService } from './device-measurements.service';

@Module({
  imports: [
    MycodoDatabaseModule,
    TypeOrmModule.forFeature([MycodoDeviceMeasurementsEntity], MYCODO_DB),
  ],
  providers: [MycodoDeviceMeasurementsService],
  exports: [MycodoDeviceMeasurementsService],
})
export class MycodoDeviceMeasurementsModule {}
