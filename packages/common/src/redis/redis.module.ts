import { CacheModule, Module } from '@nestjs/common';
import redisStore from 'cache-manager-ioredis';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      port: 6379,
      ttl: 0,
    }),
  ],
})
export class RedisModule {}
