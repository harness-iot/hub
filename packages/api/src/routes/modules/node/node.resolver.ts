import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Query, ID } from '@nestjs/graphql';

import { NodeEntity } from '@harriot-hub/common';
import { AuthRouteGuard } from '@harriot-routes/auth/auth.guard';

import { CreateNodeInput } from './inputs/create.input';
import { UpdateNodeNicknameInput } from './inputs/update-nickname.input';
import { UpdateNodeStatusInput } from './inputs/update-status.input';
import { NodeRouteService } from './node.service';

@Resolver('route/node')
@UseGuards(AuthRouteGuard)
export class NodeRouteResolver {
  constructor(private readonly nodeService: NodeRouteService) {}

  @Mutation(() => NodeEntity)
  async createNode(@Args('input') input: CreateNodeInput): Promise<NodeEntity> {
    return this.nodeService.create(input);
  }

  @Mutation(() => NodeEntity)
  async updateNodeStatus(
    @Args({ name: 'id', type: () => ID }) id: string,
    @Args('input') input: UpdateNodeStatusInput,
  ): Promise<NodeEntity> {
    return this.nodeService.updateStatus(id, input);
  }

  @Mutation(() => NodeEntity)
  async updateNodeNickname(
    @Args({ name: 'id', type: () => ID }) id: string,
    @Args('input') input: UpdateNodeNicknameInput,
  ): Promise<NodeEntity> {
    return this.nodeService.updateNickname(id, input);
  }

  @Query(() => [NodeEntity])
  async findAllNodes(): Promise<NodeEntity[]> {
    return this.nodeService.find();
  }

  @Query(() => NodeEntity)
  async findNodeById(
    @Args({ name: 'id', type: () => ID }) id: string,
  ): Promise<NodeEntity> {
    return this.nodeService.findOneById(id);
  }

  @Mutation(() => Boolean)
  async influxTest(
    @Args({ name: 'id', type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.nodeService.influxTest(id);
  }
}
