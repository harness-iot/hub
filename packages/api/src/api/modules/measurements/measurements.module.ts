import { Module } from '@nestjs/common';

import { MycodoApiModule } from '@harriot-api/mycodo-api/mycodo-api.module';
import { HarriotNodeModule } from '@harriot-core/modules/node/node.module';
import { MqttModule } from '@harriot-mqtt/mqtt.module';
import { MycodoDeviceMeasurementsModule } from '@harriot-mycodo/modules/device-measurements/device-measurements.module';

import { ApiMeasurementsResolver } from './measurements.resolver';
import { ApiMeasurementsService } from './measurements.service';

@Module({
  imports: [
    MycodoApiModule,
    MqttModule,
    HarriotNodeModule,
    MycodoDeviceMeasurementsModule,
  ],
  providers: [ApiMeasurementsService, ApiMeasurementsResolver],
})
export class ApiMeasurementsModule {}
