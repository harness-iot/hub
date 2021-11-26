import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Redis } from 'ioredis';

import { CLIENT_PROVIDER } from '@harriot-controller/client/client.constants';

@Injectable()
export class NodeService {
  logger = new Logger('NodeService');

  constructor(
    @Inject(CLIENT_PROVIDER) private readonly client: ClientProxy,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async status(secret: string, payload: string): Promise<void> {
    try {
      switch (payload) {
        case 'offline':
          this.redis.del(`node:${secret}`);
          break;
        case 'online':
          this.redis.set(`node:${secret}`, 0);
          break;
        default:
          this.logger.error(`Invalid node status payload: ${payload}`);
      }
    } catch (error) {
      this.logger.error('[NodeService:status]', error);
    }
  }
}
