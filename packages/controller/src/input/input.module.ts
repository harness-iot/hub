import { Module } from '@nestjs/common';

import { ClientModule } from '@harriot-controller/client/client.module';
import { InfluxModule, RedisModule } from '@harriot-hub/common';

import { InputController } from './input.controller';
import { InputService } from './input.service';

@Module({
  imports: [ClientModule, InfluxModule, RedisModule],
  controllers: [InputController],
  providers: [InputService],
})
export class InputModule {}
