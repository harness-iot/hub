import { Module } from '@nestjs/common';

import { InfluxModule } from '@harriot-hub/common';

import { NodeMeasurementRouteResolver } from './node-measurement.resolver';
import { NodeMeasurementRouteService } from './node-measurement.service';

@Module({
  imports: [InfluxModule],
  providers: [NodeMeasurementRouteService, NodeMeasurementRouteResolver],
})
export class NodeMeasurementRouteModule {}
