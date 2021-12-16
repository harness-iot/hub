import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query, ID } from '@nestjs/graphql';

import { NodeChannelMeasurementDto } from '@harriot-hub/common';
import { AuthRouteGuard } from '@harriot-routes/auth/auth.guard';

import { LastMeasurementByDurationInput } from './input/last-measurement-duration.input';
import { NodeMeasurementRouteService } from './node-measurement.service';

@Resolver('route/node-measurement')
@UseGuards(AuthRouteGuard)
export class NodeMeasurementRouteResolver {
  constructor(private readonly channelService: NodeMeasurementRouteService) {}

  @Query(() => [NodeChannelMeasurementDto])
  async findLastMeasurementAvailable(
    @Args({ name: 'node_id', type: () => ID }) node_id: string,
  ): Promise<NodeChannelMeasurementDto[]> {
    return this.channelService.lastMeasurementAvailable(node_id);
  }

  @Query(() => [NodeChannelMeasurementDto])
  async findLastMeasurementByDuration(
    @Args('input') input: LastMeasurementByDurationInput,
  ): Promise<NodeChannelMeasurementDto[]> {
    return this.channelService.lastMeasurementByDuration(input);
  }
}
