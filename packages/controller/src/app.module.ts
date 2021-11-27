import { Module } from '@nestjs/common';

import { ConfigModule } from './config/config.module';
import { InputModule } from './input/input.module';
import { NodeModule } from './node/node.module';
import { StatusModule } from './status/status.module';

@Module({
  imports: [ConfigModule, NodeModule, InputModule, StatusModule],
})
export class AppModule {}
