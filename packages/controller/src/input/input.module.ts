import { Module } from '@nestjs/common';

import { ClientModule } from '@mqtt-transporter/client/client.module';

import { InputController } from './input.controller';
import { InputService } from './input.service';

@Module({
  imports: [ClientModule],
  controllers: [InputController],
  providers: [InputService],
})
export class InputModule {}
