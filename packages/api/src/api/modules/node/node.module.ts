import { Module } from '@nestjs/common';

import { MycodoApiModule } from '@harriot-api/mycodo-api/mycodo-api.module';
import { HarriotNodeModule } from '@harriot-core/modules/node/node.module';
import { MqttModule } from '@harriot-mqtt/mqtt.module';
import { MycodoInputModule } from '@harriot-mycodo/modules/input/input.module';
import { MycodoOutputModule } from '@harriot-mycodo/modules/output/output.module';

import { ApiNodeResolver } from './node.resolver';
import { ApiNodeService } from './node.service';

@Module({
  imports: [
    HarriotNodeModule,
    MycodoInputModule,
    MycodoOutputModule,
    MycodoApiModule,
    MqttModule,
  ],
  providers: [ApiNodeService, ApiNodeResolver],
  exports: [ApiNodeService],
})
export class ApiNodeModule {}
