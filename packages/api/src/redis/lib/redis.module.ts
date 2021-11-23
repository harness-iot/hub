import { DynamicModule, Module } from '@nestjs/common';

import { RedisCoreModule } from './redis-core.module';
import { RedisModuleAsyncOptions, RedisModuleOptions } from './redis.interface';

@Module({})
export class RedisModule {
  static register(
    options: RedisModuleOptions | RedisModuleOptions[],
  ): DynamicModule {
    return {
      module: RedisModule,
      imports: [RedisCoreModule.register(options)],
    };
  }

  static forRootAsync(options: RedisModuleAsyncOptions): DynamicModule {
    return {
      module: RedisModule,
      imports: [RedisCoreModule.forRootAsync(options)],
    };
  }
}
