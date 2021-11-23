import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MYCODO_DB } from '@harriot-mycodo/database/database.constants';
import { MycodoDatabaseModule } from '@harriot-mycodo/database/database.module';

import { MycodoDeviceMeasurementsModule } from '../device-measurements/device-measurements.module';
import { MycodoDisplayOrderModule } from '../display-order/display-order.module';
import { MycodoOutputChannelModule } from '../output-channel/output-channel.module';

import { MycodoOutputEntity } from './output.entity';
import { MycodoOutputService } from './output.service';

@Module({
  imports: [
    MycodoDatabaseModule,
    TypeOrmModule.forFeature([MycodoOutputEntity], MYCODO_DB),
    MycodoDeviceMeasurementsModule,
    MycodoOutputChannelModule,
    MycodoDisplayOrderModule,
  ],
  providers: [MycodoOutputService],
  exports: [MycodoOutputService],
})
export class MycodoOutputModule {}
