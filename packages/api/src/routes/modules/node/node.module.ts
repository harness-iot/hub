import { Module } from '@nestjs/common';

import { InfluxModule, NodeEntityModule } from '@harriot-hub/common';

import { NodeRouteResolver } from './node.resolver';
import { NodeRouteService } from './node.service';

@Module({
  imports: [NodeEntityModule, InfluxModule],
  providers: [NodeRouteService, NodeRouteResolver],
})
export class NodeRouteModule {}
