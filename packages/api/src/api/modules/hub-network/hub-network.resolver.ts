import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { ApiAuthGuard } from '@harriot-api/auth/auth.guard';

import { ApCredentialsDto } from './dto/ap-credentials.dto';
import { ApiHubNetworkService } from './hub-network.service';
import { HubfiCredentialsInput } from './inputs/hubfi-credentials.input';

@Resolver('api/hub-network')
export class ApiHubNetworkResolver {
  constructor(protected readonly hubService: ApiHubNetworkService) {}

  @Query(() => Boolean)
  async pingNetwork(): Promise<boolean> {
    return true;
  }

  @UseGuards(ApiAuthGuard)
  @Mutation(() => ApCredentialsDto)
  async setNodeApCredentials(): Promise<ApCredentialsDto> {
    return this.hubService.setNodeApCredentials();
  }

  @UseGuards(ApiAuthGuard)
  @Query(() => String)
  async getHubNetworkType(): Promise<string> {
    return this.hubService.getHubNetworkType();
  }

  @UseGuards(ApiAuthGuard)
  @Mutation(() => Boolean)
  async setHubNetworkType(@Args('type') type: 'wifi' | 'ap'): Promise<boolean> {
    return this.hubService.setHubNetworkType(type);
  }

  @UseGuards(ApiAuthGuard)
  @Query(() => ApCredentialsDto)
  async getNodeApCredentials(): Promise<ApCredentialsDto> {
    return this.hubService.getNodeApCredentials();
  }

  @UseGuards(ApiAuthGuard)
  @Mutation(() => ApCredentialsDto)
  async setHubFiCredentials(
    @Args('input') input: HubfiCredentialsInput,
  ): Promise<ApCredentialsDto> {
    return this.hubService.setHubAp(input);
  }

  @UseGuards(ApiAuthGuard)
  @Query(() => String)
  async getHubFiSSID(): Promise<string> {
    return this.hubService.getHubFiSSID();
  }
}
