import { Module } from '@nestjs/common';

import { mqttProvider } from './mqtt.service';

@Module({
  providers: [mqttProvider],
  exports: [mqttProvider],
})
export class MqttModule {}
