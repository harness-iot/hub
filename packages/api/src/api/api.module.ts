import { Module } from '@nestjs/common';

import { HarriotConfigModule } from '@harriot-core/modules/config/config.module';
import { HarriotUserModule } from '@harriot-core/modules/user/user.module';

import { ApiService } from './api.service';
import { ApiConditionalModule } from './modules/conditional/conditional.module';
import { ApiControllerModule } from './modules/controller/controller.module';
import { ApiDeviceMeasurementsModule } from './modules/device-measurements/device-measurements.module';
import { ApiHubNetworkModule } from './modules/hub-network/hub-network.module';
import { ApiHubModule } from './modules/hub/hub.module';
import { ApiInputModule } from './modules/input/input.module';
import { ApiMeasurementsModule } from './modules/measurements/measurements.module';
import { ApiNodeModule } from './modules/node/node.module';
import { ApiOutputChannelModule } from './modules/output-channel/output-channel.module';
import { ApiOutputModule } from './modules/output/output.module';

@Module({
  imports: [
    HarriotConfigModule,
    HarriotUserModule,
    ApiHubModule,
    ApiHubNetworkModule,
    ApiNodeModule,
    ApiControllerModule,
    ApiOutputModule,
    ApiOutputChannelModule,
    ApiInputModule,
    ApiDeviceMeasurementsModule,
    ApiMeasurementsModule,
    ApiConditionalModule,
  ],
  providers: [ApiService],
  exports: [ApiService],
})
export class ApiModule {}
