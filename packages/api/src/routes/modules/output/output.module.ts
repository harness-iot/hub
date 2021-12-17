import { Module } from '@nestjs/common';

import { OutputControllerModule } from '@harriot-controller/output/output-controller.module';

import { NodeOutputRouteResolver } from './output.resolver';
import { NodeOutputRouteService } from './output.service';

@Module({
  imports: [OutputControllerModule],
  providers: [NodeOutputRouteService, NodeOutputRouteResolver],
})
export class NodeOutputRouteModule {}
