import { Module } from '@nestjs/common';

import { RedisModule } from '@harriot-hub/common';

import { ConditionalModule } from './conditional/conditional.module';
import { ConfigModule } from './config/config.module';
import { InputModule } from './input/input.module';
import { NodeModule } from './node/node.module';
import { SystemModule } from './system/system.module';

@Module({
  imports: [
    RedisModule,
    ConfigModule,
    SystemModule,
    NodeModule,
    InputModule,
    ConditionalModule,
  ],
})
export class AppModule {}
