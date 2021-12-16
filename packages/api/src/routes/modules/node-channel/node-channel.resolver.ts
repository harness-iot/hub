import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query, ID, Mutation } from '@nestjs/graphql';

import { NodeChannelEntity } from '@harriot-hub/common';
import { AuthRouteGuard } from '@harriot-routes/auth/auth.guard';

import { UpdateChannelNameInput } from './inputs/update-name.input';
import { UpdateChannelMeasurementUnitInput } from './inputs/update-unit.input';
import { NodeChannelRouteService } from './node-channel.service';

@Resolver(() => NodeChannelEntity)
@UseGuards(AuthRouteGuard)
export class NodeChannelRouteResolver {
  constructor(private readonly channelService: NodeChannelRouteService) {}

  @Query(() => [NodeChannelEntity])
  async findNodeChannelsByNodeId(
    @Args({ name: 'node_id', type: () => ID }) node_id: string,
  ): Promise<NodeChannelEntity[]> {
    return this.channelService.findByNodeId(node_id);
  }

  @Mutation(() => NodeChannelEntity)
  async updateChannelMeasurementUnit(
    @Args('input') input: UpdateChannelMeasurementUnitInput,
  ): Promise<NodeChannelEntity> {
    return this.channelService.updateMeasurementUnit(input);
  }

  @Mutation(() => NodeChannelEntity)
  async updateOutputChannelName(
    @Args({ name: 'channel_id', type: () => ID }) channel_id: string,
    @Args('input') input: UpdateChannelNameInput,
  ): Promise<NodeChannelEntity> {
    return this.channelService.updateChannelName(channel_id, input);
  }
}
