import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable,
} from '@nestjs/common';
import redisStore from 'cache-manager-ioredis';

import { ConfigService } from '@harriot-controller/config/config.service';

@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
  constructor(protected readonly configService: ConfigService) {}

  createCacheOptions(): CacheModuleOptions {
    return {
      store: redisStore,
      host: this.configService.REDIS_HOST,
      port: this.configService.REDIS_PORT,
      ttl: 0,
    };
  }
}
