import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';

import { ConditionalEntity } from '@harriot-hub/common';
import { AuthRouteGuard } from '@harriot-routes/auth/auth.guard';

import { CreateTimeAutomationInput } from './inputs/create-time.input';
import { AutomateRouteTimerService } from './service/automate-timer.service';

@Resolver('route/automate')
@UseGuards(AuthRouteGuard)
export class AutomateRouteResolver {
  constructor(private readonly timeService: AutomateRouteTimerService) {}

  @Mutation(() => ConditionalEntity)
  async createTimeAutomation(
    @Args('input') input: CreateTimeAutomationInput,
  ): Promise<ConditionalEntity> {
    return this.timeService.create(input);
  }
}
