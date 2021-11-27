import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { ApiAuthGuard } from '@harriot-api/auth/auth.guard';
import { ConditionalEntity } from '@harriot-hub/common';

import { ApiConditionalService } from './conditional.service';
import { CreateConditionalInput } from './inputs/create.input';

@Resolver('api/conditional')
@UseGuards(ApiAuthGuard)
export class ApiConditionalResolver {
  constructor(private readonly conditionalService: ApiConditionalService) {}

  @Mutation(() => ConditionalEntity)
  async createConditionalController(
    @Args('input') input: CreateConditionalInput,
  ): Promise<ConditionalEntity> {
    return this.conditionalService.create(input);
  }
}
