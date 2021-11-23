import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';

import { ApiAuthGuard } from '@harriot-api/auth/auth.guard';

import { ApiControllerService } from './controller.service';
import { ControllerUpdateStatusInput } from './inputs/status.input';

@Resolver('api/controller')
@UseGuards(ApiAuthGuard)
export class ApiControllerResolver {
  constructor(private readonly controllerService: ApiControllerService) {}

  @Mutation(() => Boolean)
  async updateControllerStatus(
    @Args('input') input: ControllerUpdateStatusInput,
  ): Promise<boolean> {
    return this.controllerService.updateStatus(input);
  }
}
