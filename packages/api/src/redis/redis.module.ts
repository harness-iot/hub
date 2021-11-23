import { Module } from '@nestjs/common';

import { ConfigService } from '../config/config.service';

import { RedisModule as NestjsRedisModule } from './lib/redis.module';

@Module({
  imports: [
    NestjsRedisModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        host: configService.REDIS_HOST,
        port: configService.REDIS_PORT,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class RedisModule {}
