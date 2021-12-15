import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, ID } from '@nestjs/graphql';

import { InputControllerResponseEnum } from '@harriot-controller/input/enums/input-controller-response.enum';
import { AuthRouteGuard } from '@harriot-routes/auth/auth.guard';

import { NodeInputActiveStatusEnum } from './input.enum';
import { NodeInputRouteService } from './input.service';

@Resolver('route/input')
@UseGuards(AuthRouteGuard)
export class NodeInputRouteResolver {
  constructor(private readonly inputService: NodeInputRouteService) {}

  @Mutation(() => InputControllerResponseEnum)
  async nodeInputUpdateActiveStatus(
    @Args({ name: 'node_id', type: () => ID }) node_id: string,
    @Args({ name: 'status', type: () => NodeInputActiveStatusEnum })
    status: NodeInputActiveStatusEnum,
  ): Promise<InputControllerResponseEnum> {
    return this.inputService.activate(node_id, status);
  }
}
