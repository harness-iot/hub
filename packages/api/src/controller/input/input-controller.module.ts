import { Module } from '@nestjs/common';

import { NodeChannelEntityModule, RedisModule } from '@harriot-hub/common';
import { MqttModule } from '@harriot-mqtt/mqtt.module';

import { InputControllerService } from './input-controller.service';

@Module({
  imports: [MqttModule, RedisModule, NodeChannelEntityModule],
  providers: [InputControllerService],
  exports: [InputControllerService],
})
export class InputControllerModule {}
