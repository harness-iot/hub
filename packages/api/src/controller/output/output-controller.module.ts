import { Module } from '@nestjs/common';

import { NodeChannelEntityModule, RedisModule } from '@harriot-hub/common';
import { MqttModule } from '@harriot-mqtt/mqtt.module';

import { OutputControllerService } from './output-controller.service';

@Module({
  imports: [MqttModule, RedisModule, NodeChannelEntityModule],
  providers: [OutputControllerService],
  exports: [OutputControllerService],
})
export class OutputControllerModule {}
