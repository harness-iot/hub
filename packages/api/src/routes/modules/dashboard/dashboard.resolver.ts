import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';

import { DashboardCardEntity } from '@harriot-hub/common';
import { AuthRouteGuard } from '@harriot-routes/auth/auth.guard';

import { DashboardRouteService } from './dashboard.service';
import { AddDashboardCardInput } from './inputs/add.input';

@Resolver('route/dashboard')
@UseGuards(AuthRouteGuard)
export class DashboardRouteResolver {
  constructor(private readonly dashboardService: DashboardRouteService) {}

  @Query(() => [DashboardCardEntity], { nullable: false })
  async findAllDashboardCards(): Promise<DashboardCardEntity[]> {
    return this.dashboardService.findAllCards();
  }

  @Mutation(() => DashboardCardEntity)
  async addDashboardCard(
    @Args('input') input: AddDashboardCardInput,
  ): Promise<DashboardCardEntity> {
    return this.dashboardService.addCard(input);
  }

  @Mutation(() => Boolean)
  async removeDashboardCard(
    @Args({ name: 'controller_id', type: () => ID }) controller_id: string,
  ): Promise<boolean> {
    return this.dashboardService.removeCard(controller_id);
  }
}
