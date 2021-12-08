import { Module } from '@nestjs/common';

import { NodeModule } from '@harriot-modules/node/node.module';

import { NodeRouteResolver } from './node.resolver';
import { NodeRouteService } from './node.service';

@Module({
  imports: [NodeModule],
  providers: [NodeRouteService, NodeRouteResolver],
})
export class NodeRouteModule {}
