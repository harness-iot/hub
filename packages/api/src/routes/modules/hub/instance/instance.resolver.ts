import { Resolver, Mutation, Args } from '@nestjs/graphql';

import { HubInstanceRouteService } from './instance.service';

@Resolver('route/hub/instance')
export class HubInstanceRouteResolver {
  constructor(protected readonly hubService: HubInstanceRouteService) {}

  @Mutation(() => Boolean)
  async setupHubInstance(@Args('token') token: string): Promise<boolean> {
    return this.hubService.setupHub(token);
  }
}
