import { Module } from '@nestjs/common';

import {
  MeasurementConversionEntityModule,
  NodeChannelEntityModule,
} from '@harriot-hub/common';

import { NodeChannelRouteResolver } from './node-channel.resolver';
import { NodeChannelRouteService } from './node-channel.service';

@Module({
  imports: [NodeChannelEntityModule, MeasurementConversionEntityModule],
  providers: [NodeChannelRouteService, NodeChannelRouteResolver],
})
export class NodeChannelRouteModule {}
