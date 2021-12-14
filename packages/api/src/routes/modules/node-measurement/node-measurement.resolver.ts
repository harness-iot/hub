import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';

import { NodeChannelMeasurementDto } from '@harriot-hub/common';
import { AuthRouteGuard } from '@harriot-routes/auth/auth.guard';

import { LastMeasurementInput } from './input/update-period.input';
import { NodeMeasurementRouteService } from './node-measurement.service';

@Resolver('route/node-measurement')
@UseGuards(AuthRouteGuard)
export class NodeMeasurementRouteResolver {
  constructor(private readonly channelService: NodeMeasurementRouteService) {}

  @Query(() => [NodeChannelMeasurementDto])
  async findLastMeasurement(
    @Args('input') input: LastMeasurementInput,
  ): Promise<NodeChannelMeasurementDto[]> {
    return this.channelService.lastMeasurement(input);
  }
}
