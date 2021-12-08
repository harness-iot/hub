import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { NodeSecret } from '../decorators/secret.decorator';

import { InputService } from './input.service';

@Controller()
export class InputController {
  logger = new Logger('InputController');

  constructor(private readonly inputService: InputService) {}

  @MessagePattern('input/+')
  async handleActivity(
    @NodeSecret() secret: string,
    @Payload() payload: any,
  ): Promise<void> {
    return this.inputService.activity(secret, payload);
  }
}
