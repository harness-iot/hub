import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Observable, Subscription } from 'rxjs';

import { ApiAuthGuard } from '@harriot-api/auth/auth.guard';
import { HarriotNodeEntity } from '@harriot-core/modules/node/node.entity';
import { NodeEntity } from '@harriot-hub/common';

import { UpdateNodeDto } from './dto/update.dto';
import { CreateNodeInput } from './inputs/create.input';
import { UpdateNodeInput } from './inputs/update.input';
import { ApiNodeService } from './node.service';

@Resolver('api/node')
@UseGuards(ApiAuthGuard)
export class ApiNodeResolver {
  constructor(private readonly nodeService: ApiNodeService) {}

  @Mutation(() => NodeEntity)
  async createNode(@Args('input') input: CreateNodeInput): Promise<NodeEntity> {
    return this.nodeService.create(input);
  }

  @Query(() => [NodeEntity])
  async findAllNodes(): Promise<NodeEntity[]> {
    return this.nodeService.find();
  }

  @Query(() => NodeEntity)
  async findNodeByPublicKey(
    @Args({ name: 'public_key', type: () => ID }) public_key: string,
  ): Promise<NodeEntity> {
    return this.nodeService.findOneByPublicKey(public_key);
  }

  @Mutation(() => NodeEntity)
  async updateNode(
    @Args({ name: 'public_key', type: () => ID }) public_key: string,
    @Args('input') input: UpdateNodeInput,
  ): Promise<NodeEntity> {
    return this.nodeService.update(public_key, input);
  }

  @Query(() => [String])
  testFindConnectedNodes(): Observable<string[]> {
    return this.nodeService.testFindConnected();
  }
}
