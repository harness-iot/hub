import { Module } from '@nestjs/common';

import { ClientModule } from '@harriot-controller/client/client.module';
import { DatabaseModule } from '@harriot-controller/database/database.module';
import {
  NodeEntityModule,
  NodeInputSettingsEntityModule,
  RedisModule,
  NodeOutputSettingsEntityModule,
} from '@harriot-hub/common';

import { NodeController } from './node.controller';
import { NodeService } from './node.service';

@Module({
  imports: [
    ClientModule,
    DatabaseModule,
    RedisModule,
    NodeEntityModule,
    NodeInputSettingsEntityModule,
    NodeOutputSettingsEntityModule,
  ],
  controllers: [NodeController],
  providers: [NodeService],
  exports: [NodeService],
})
export class NodeModule {}
