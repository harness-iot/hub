import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { ApiAuthGuard } from '@harriot-api/auth/auth.guard';

import { CheckHubDto } from './dto/check.dto';
import { HubInstanceRouteService } from './instance.service';

@Resolver('route/hub/instance')
export class HubInstanceRouteResolver {
  constructor(protected readonly hubService: HubInstanceRouteService) {}

  @Mutation(() => Boolean)
  async setupHubInstance(@Args('token') token: string): Promise<boolean> {
    return this.hubService.setupHub(token);
  }

  @UseGuards(ApiAuthGuard)
  @Query(() => [CheckHubDto])
  async checkHub(): Promise<CheckHubDto[]> {
    return this.hubService.check();
  }
}
