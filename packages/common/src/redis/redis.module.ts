import { RedisModule as NestjsRedisModule } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';

import { RedisService } from './redis.service';

@Module({
  imports: [
    NestjsRedisModule.forRoot({
      config: {
        namespace: 'default',
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
