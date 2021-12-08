import { Module } from '@nestjs/common';

import {
  MeasurementConversionModule,
  NodeChannelModule,
} from '@harriot-hub/common';

import { NodeChannelRouteResolver } from './node-channel.resolver';
import { NodeChannelRouteService } from './node-channel.service';

@Module({
  imports: [NodeChannelModule, MeasurementConversionModule],
  providers: [NodeChannelRouteService, NodeChannelRouteResolver],
})
export class NodeChannelRouteModule {}
