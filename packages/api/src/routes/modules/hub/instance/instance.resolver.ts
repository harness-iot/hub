import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';

import { AuthRole } from '@harness-api/modules/role/role.decorator';
import { HubInstanceRoleEnum } from '@harness-api/modules/role/role.enum';
import { RolesGuard } from '@harness-api/modules/role/role.guard';

import { HubInstanceRouteService } from './instance.service';

@Resolver('route/hub/instance')
export class HubInstanceRouteResolver {
  constructor(protected readonly hubService: HubInstanceRouteService) {}

  @Mutation(() => Boolean)
  async setupHubInstance(@Args('token') token: string): Promise<boolean> {
    return this.hubService.setupHub(token);
  }

  @AuthRole(HubInstanceRoleEnum.ADMIN)
  @UseGuards(RolesGuard)
  @Mutation(() => Boolean)
  async deleteHubInstance(): Promise<boolean> {
    return this.hubService.deleteInstance();
  }
}
