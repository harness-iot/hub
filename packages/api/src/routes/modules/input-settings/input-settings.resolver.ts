import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';

import { NodeInputSettingsEntity } from '@harriot-hub/common';
import { AuthRouteGuard } from '@harriot-routes/auth/auth.guard';

import { NodeInputSettingsRouteService } from './input-settings.service';
import { UpdateInputSettingsPeriodInput } from './input/update-period.input';

@Resolver('route/input-settings')
@UseGuards(AuthRouteGuard)
export class NodeInputSettingsRouteResolver {
  constructor(
    private readonly settingsService: NodeInputSettingsRouteService,
  ) {}

  @Query(() => NodeInputSettingsEntity)
  async findInputSettingsByNodeId(
    @Args({ name: 'node_id', type: () => ID }) node_id: string,
  ): Promise<NodeInputSettingsEntity> {
    return this.settingsService.findByNodeId(node_id);
  }

  @Mutation(() => NodeInputSettingsEntity)
  async updateInputSettingsPeriod(
    @Args({ name: 'node_id', type: () => ID }) node_id: string,
    @Args('input') input: UpdateInputSettingsPeriodInput,
  ): Promise<NodeInputSettingsEntity> {
    return this.settingsService.updatePeriod(node_id, input);
  }
}
