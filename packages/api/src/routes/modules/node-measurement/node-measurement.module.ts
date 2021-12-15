import { Module } from '@nestjs/common';

import {
  DateScalar,
  InfluxModule,
  NodeChannelEntityModule,
  RedisModule,
} from '@harriot-hub/common';

import { NodeMeasurementRouteResolver } from './node-measurement.resolver';
import { NodeMeasurementRouteService } from './node-measurement.service';

@Module({
  imports: [InfluxModule, RedisModule, NodeChannelEntityModule],
  providers: [NodeMeasurementRouteService, NodeMeasurementRouteResolver],
})
export class NodeMeasurementRouteModule {}
