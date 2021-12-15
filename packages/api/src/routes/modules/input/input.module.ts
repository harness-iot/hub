import { Module } from '@nestjs/common';

import { InputControllerModule } from '@harriot-controller/input/input-controller.module';

import { NodeInputRouteResolver } from './input.resolver';
import { NodeInputRouteService } from './input.service';

@Module({
  imports: [InputControllerModule],
  providers: [NodeInputRouteService, NodeInputRouteResolver],
})
export class NodeInputRouteModule {}
