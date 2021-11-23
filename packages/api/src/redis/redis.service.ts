import { Injectable } from '@nestjs/common';
import { RedisModuleOptions } from 'nestjs-redis';

import { ConfigService } from '../config/config.service';

@Injectable()
export class RedisService {
  constructor(readonly configService: ConfigService) {}
  get options(): RedisModuleOptions {
    return {
      host: this.configService.REDIS_HOST,
      port: this.configService.REDIS_PORT,
      onClientReady: async (client) => {
        client.on('error', (err) => {
          console.log('REDIS ERRRRR', err);
        });
      },
    };
  }
}
