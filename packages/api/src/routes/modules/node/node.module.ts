import { Module } from '@nestjs/common';

import { NodeEntityModule, RedisModule } from '@harriot-hub/common';

import { NodeRouteResolver } from './node.resolver';
import { NodeRouteService } from './node.service';

@Module({
  imports: [NodeEntityModule, RedisModule],
  providers: [NodeRouteService, NodeRouteResolver],
})
export class NodeRouteModule {}
