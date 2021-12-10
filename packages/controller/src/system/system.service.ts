import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy, MqttContext } from '@nestjs/microservices';

import { CLIENT_PROVIDER } from '@harriot-controller/client/client.constants';

@Injectable()
export class SystemService {
  logger = new Logger(SystemService.name);

  constructor(@Inject(CLIENT_PROVIDER) private client: ClientProxy) {}

  public online(context: MqttContext): Promise<void> {
    this.logger.log('CONTROLLER ONLINE');

    this.client.emit('alive_check', {});
    return;
  }
}
