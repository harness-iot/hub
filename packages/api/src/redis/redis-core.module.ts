import { Module } from '@nestjs/common';
import { RedisModule as NestjsRedisModule, RedisService } from 'nestjs-redis';

import { ConfigModule } from '@harriot-config/config.module';

import { ConfigService } from '../config/config.service';

@Module({
  providers: [RedisService],
  imports: [
    NestjsRedisModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        host: configService.REDIS_HOST,
        port: configService.REDIS_PORT,
      }),
      inject: [ConfigService, ConfigModule],
    }),
  ],
  exports: [RedisService],
})
export class RedisModule {}
