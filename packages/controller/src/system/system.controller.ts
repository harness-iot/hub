import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, MqttContext } from '@nestjs/microservices';

import { SystemService } from './system.service';

@Controller()
export class SystemController {
  logger = new Logger(SystemController.name);

  constructor(private readonly systemService: SystemService) {}

  @EventPattern('controller_online')
  async handleOn(@Ctx() context: MqttContext): Promise<void> {
    return this.systemService.online(context);
  }
}
