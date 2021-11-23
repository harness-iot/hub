import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MYCODO_DB } from '@harriot-mycodo/database/database.constants';
import { MycodoDatabaseModule } from '@harriot-mycodo/database/database.module';

import { MycodoDeviceMeasurementsModule } from '../device-measurements/device-measurements.module';
import { MycodoDisplayOrderModule } from '../display-order/display-order.module';
import { MycodoInputChannelModule } from '../input-channel/input-channel.module';

import { MycodoInputEntity } from './input.entity';
import { MycodoInputService } from './input.service';

@Module({
  imports: [
    MycodoDatabaseModule,
    TypeOrmModule.forFeature([MycodoInputEntity], MYCODO_DB),
    MycodoDeviceMeasurementsModule,
    MycodoInputChannelModule,
    MycodoDisplayOrderModule,
  ],
  providers: [MycodoInputService],
  exports: [MycodoInputService],
})
export class MycodoInputModule {}
