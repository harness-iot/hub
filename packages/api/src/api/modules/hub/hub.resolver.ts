import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { ApiAuthGuard } from '@harriot-api/auth/auth.guard';

import { CheckHubDto } from './dto/check.dto';
import { ApiHubService } from './hub.service';

@Resolver('api/hub')
export class ApiHubResolver {
  constructor(protected readonly hubService: ApiHubService) {}

  @Mutation(() => Boolean)
  async setupHubInstance(@Args('token') token: string): Promise<boolean> {
    return this.hubService.setupHub(token);
  }

  @UseGuards(ApiAuthGuard)
  @Query(() => [CheckHubDto])
  async checkHub(): Promise<CheckHubDto[]> {
    return this.hubService.check();
  }

  @UseGuards(ApiAuthGuard)
  @Query(() => Boolean)
  async isHubAvailable(): Promise<boolean> {
    return true;
  }
}
