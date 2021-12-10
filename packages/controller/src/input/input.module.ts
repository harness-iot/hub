import { Module } from '@nestjs/common';

import { ClientModule } from '@harriot-controller/client/client.module';
import { InfluxModule } from '@harriot-hub/common';

import { InputController } from './input.controller';
import { InputService } from './input.service';

@Module({
  imports: [ClientModule, InfluxModule],
  controllers: [InputController],
  providers: [InputService],
})
export class InputModule {}
