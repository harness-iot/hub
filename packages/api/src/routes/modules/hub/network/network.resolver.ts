import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { AuthRouteGuard } from '@harriot-routes/auth/auth.guard';

import { ApCredentialsDto } from './dto/ap-credentials.dto';
import { NetworkSettingsDetailsUnion } from './dto/details.dto';
import { HubfiCredentialsInput } from './inputs/hubfi-credentials.input';
import { HubNetworkRouteService } from './network.service';

@Resolver('route/hub/network')
export class HubNetworkRouteResolver {
  constructor(protected readonly networkService: HubNetworkRouteService) {}

  /**
   *  Check network connection. Used before instance
   *  setup so no auth required.
   */
  @Query(() => Boolean)
  async pingNetwork(): Promise<boolean> {
    return this.networkService.pingNetwork();
  }

  @UseGuards(AuthRouteGuard)
  @Mutation(() => ApCredentialsDto)
  async setNodeApCredentials(): Promise<ApCredentialsDto> {
    return this.networkService.setNodeApCredentials();
  }

  @UseGuards(AuthRouteGuard)
  @Query(() => ApCredentialsDto)
  async getNodeApCredentials(): Promise<ApCredentialsDto> {
    return this.networkService.getNodeApCredentials();
  }

  @UseGuards(AuthRouteGuard)
  @Mutation(() => ApCredentialsDto)
  async setHubFiCredentials(
    @Args('input') input: HubfiCredentialsInput,
  ): Promise<ApCredentialsDto> {
    return this.networkService.setHubAp(input);
  }

  @UseGuards(AuthRouteGuard)
  @Query(() => String)
  async getHubFiSSID(): Promise<string> {
    return this.networkService.getHubFiSSID();
  }

  // This should be nullable even if union type doesn't reflect that
  @UseGuards(AuthRouteGuard)
  @Query(() => NetworkSettingsDetailsUnion, { nullable: true })
  async networkGetDetails(): Promise<typeof NetworkSettingsDetailsUnion> {
    return this.networkService.getDetails();
  }

  @UseGuards(AuthRouteGuard)
  @Mutation(() => NetworkSettingsDetailsUnion)
  async networkSetIpAddressStatic(
    @Args('ip') ip: string,
  ): Promise<typeof NetworkSettingsDetailsUnion> {
    return this.networkService.set_ip_address_static(ip);
  }

  @UseGuards(AuthRouteGuard)
  @Mutation(() => NetworkSettingsDetailsUnion)
  async networkSetIpAddressDynamic(): Promise<
    typeof NetworkSettingsDetailsUnion
  > {
    return this.networkService.set_ip_address_dynamic();
  }
}
