import { Module } from '@nestjs/common';

import { MycodoConversionModule } from '@harriot-mycodo/modules/conversion/conversion.module';
import { MycodoDeviceMeasurementsModule } from '@harriot-mycodo/modules/device-measurements/device-measurements.module';

import { ApiDeviceMeasurementsResolver } from './device-measurements.resolver';
import { ApiDeviceMeasurementsService } from './device-measurements.service';

@Module({
  imports: [MycodoDeviceMeasurementsModule, MycodoConversionModule],
  providers: [ApiDeviceMeasurementsService, ApiDeviceMeasurementsResolver],
})
export class ApiDeviceMeasurementsModule {}
