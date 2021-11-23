import { RedisModule, RedisModuleOptions } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';

import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { InputModule } from './input/input.module';
import { NodeModule } from './node/node.module';

@Module({
  imports: [
    ConfigModule,
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (
        config: ConfigService,
      ): Promise<RedisModuleOptions> => ({
        config: {
          host: config.REDIS_HOST,
          port: config.REDIS_PORT,
        },
      }),
    }),
    NodeModule,
    InputModule,
  ],
})
export class AppModule {}
