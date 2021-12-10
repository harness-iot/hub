import { Module } from '@nestjs/common';

import { NodeEntityModule } from '@harriot-hub/common';

import { NodeRouteResolver } from './node.resolver';
import { NodeRouteService } from './node.service';

@Module({
  imports: [NodeEntityModule],
  providers: [NodeRouteService, NodeRouteResolver],
})
export class NodeRouteModule {}
