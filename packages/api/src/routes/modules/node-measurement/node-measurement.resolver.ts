import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query, ID } from '@nestjs/graphql';

import { NodeChannelMeasurementDto } from '@harriot-hub/common';
import { AuthRouteGuard } from '@harriot-routes/auth/auth.guard';

import { NodeMeasurementRouteService } from './node-measurement.service';

@Resolver('route/node-measurement')
@UseGuards(AuthRouteGuard)
export class NodeMeasurementRouteResolver {
  constructor(private readonly channelService: NodeMeasurementRouteService) {}

  @Query(() => NodeChannelMeasurementDto)
  async findLastMeasurement(
    @Args({ name: 'node_id', type: () => ID }) node_id: string,
  ): Promise<NodeChannelMeasurementDto> {
    return this.channelService.lastMeasurement(node_id);
  }
}
