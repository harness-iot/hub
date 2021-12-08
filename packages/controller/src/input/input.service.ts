import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { CLIENT_PROVIDER } from '@harriot-controller/client/client.constants';

@Injectable()
export class InputService {
  logger = new Logger('InputService');

  constructor(@Inject(CLIENT_PROVIDER) private readonly client: ClientProxy) {}

  async activity(secret: string, payload: any): Promise<void> {
    try {
      console.log('NODE INPUT ACTIVITY: ', secret, payload);
    } catch (error) {
      this.logger.error('[InputService:on]', error);
    }
  }
}
