import { Controller, Logger } from '@nestjs/common';
import { Ctx, MessagePattern, MqttContext } from '@nestjs/microservices';

import { InputService } from './input.service';

@Controller()
export class InputController {
  logger = new Logger('InputController');

  constructor(private readonly inputService: InputService) {}

  @MessagePattern('input/on/+')
  async handleOn(@Ctx() context: MqttContext): Promise<void> {
    return this.inputService.on(context);
  }

  @MessagePattern('input/off/+')
  async handleOff(@Ctx() context: MqttContext): Promise<void> {
    return this.inputService.off(context);
  }
}
