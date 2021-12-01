import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy, MqttContext } from '@nestjs/microservices';

import { CLIENT_PROVIDER } from '@harriot-controller/client/client.constants';

interface InputPayload {
  secret_key: string;
  body: string;
}

@Injectable()
export class InputService {
  logger = new Logger('InputService');

  constructor(@Inject(CLIENT_PROVIDER) private readonly client: ClientProxy) {}

  private static getPayload(context: MqttContext): InputPayload {
    const packet = context.getPacket();
    const buf = Buffer.from(packet.payload);
    const topic = packet.topic.split('/');
    return { secret_key: topic[topic.length - 1], body: buf.toString() };
  }

  async on(context: MqttContext): Promise<void> {
    try {
      const payload = InputService.getPayload(context);
      this.client.emit(`node/${payload.secret_key}`, JSON.parse(payload.body));
      this.logger.debug(`[InputService:on] ${JSON.stringify(payload)}`);
    } catch (error) {
      this.logger.error('[InputService:on]', error);
    }
  }

  async off(context: MqttContext): Promise<void> {
    try {
      const payload = InputService.getPayload(context);
      this.client.emit(`node/${payload.secret_key}`, []);
      this.logger.debug(`[InputService:off] ${JSON.stringify(payload)}`);
    } catch (error) {
      this.logger.error('[InputService:off]', error);
    }
  }

  async activity(context: MqttContext): Promise<void> {
    try {
      const payload = InputService.getPayload(context);
      this.logger.debug(`[InputService:activity] ${JSON.stringify(payload)}`);
    } catch (error) {
      this.logger.error('[InputService:activity]', error);
    }
  }
}
