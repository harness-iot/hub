import { Module } from '@nestjs/common';
import { ISingleHostConfig } from 'influx';

import { INFLUX_DB_PROVIDER } from './influx.constants';
import { InfluxService } from './influx.service';

const config: ISingleHostConfig = {
  host: 'localhost',
  database: 'harriot',
};

@Module({
  providers: [
    {
      provide: INFLUX_DB_PROVIDER,
      useValue: config,
    },
    InfluxService,
  ],
  exports: [InfluxService],
})
export class InfluxModule {}
