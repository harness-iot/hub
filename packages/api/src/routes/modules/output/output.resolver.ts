import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, ID } from '@nestjs/graphql';

import { OutputControllerResponseEnum } from '@harriot-controller/output/enums/output-controller-response.enum';
import { AuthRouteGuard } from '@harriot-routes/auth/auth.guard';

import { OutputUpdateStateInput } from './inputs/update-state.input';
import { NodeOutputRouteService } from './output.service';

@Resolver('route/output')
@UseGuards(AuthRouteGuard)
export class NodeOutputRouteResolver {
  constructor(private readonly outputService: NodeOutputRouteService) {}

  @Mutation(() => OutputControllerResponseEnum)
  async nodeOutputUpdateState(
    @Args({ name: 'node_id', type: () => ID }) node_id: string,
    @Args({ name: 'input', type: () => OutputUpdateStateInput })
    input: OutputUpdateStateInput,
  ): Promise<OutputControllerResponseEnum> {
    return this.outputService.updateState(node_id, input);
  }
}
