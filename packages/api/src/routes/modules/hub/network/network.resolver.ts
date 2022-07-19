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

  @Query(() => Boolean)
  async pingNetwork(): Promise<boolean> {
    return true;
  }

  @UseGuards(AuthRouteGuard)
  @Mutation(() => ApCredentialsDto)
  async setNodeApCredentials(): Promise<ApCredentialsDto> {
    return this.networkService.setNodeApCredentials();
  }

  @UseGuards(AuthRouteGuard)
  @Query(() => String)
  async getHubNetworkType(): Promise<string> {
    return this.networkService.getHubNetworkType();
  }

  @UseGuards(AuthRouteGuard)
  @Mutation(() => Boolean)
  async setHubNetworkType(@Args('type') type: 'wifi' | 'ap'): Promise<boolean> {
    return this.networkService.setHubNetworkType(type);
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

  // @UseGuards(AuthRouteGuard)
  @Query(() => NetworkSettingsDetailsUnion)
  async networkSettingsGetDetails(): Promise<
    typeof NetworkSettingsDetailsUnion
  > {
    return this.networkService.getDetails();
  }

  @Mutation(() => Boolean)
  async networkSetStaticIpAddress(@Args('ip') ip: string): Promise<boolean> {
    return this.networkService.set_static_ip_address(ip);
  }
}
