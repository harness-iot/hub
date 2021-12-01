import { CacheModule, Module } from '@nestjs/common';

import { ConditionalModule } from './conditional/conditional.module';
import { ConfigModule } from './config/config.module';
import { InputModule } from './input/input.module';
import { NodeModule } from './node/node.module';
import { CacheConfigService } from './redis/redis.service';
import { SystemModule } from './system/system.module';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useClass: CacheConfigService,
    }),
    ConfigModule,
    SystemModule,
    NodeModule,
    InputModule,
    ConditionalModule,
  ],
})
export class AppModule {}
