import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';

import { ApiAuthGuard } from '@harriot-api/auth/auth.guard';
import { HarriotNodeEntity } from '@harriot-core/modules/node/node.entity';

import { UpdateNodeDto } from './dto/update.dto';
import { CreateNodeInput } from './inputs/create.input';
import { UpdateNodeInput } from './inputs/update.input';
import { ApiNodeService } from './node.service';

@Resolver('api/node')
@UseGuards(ApiAuthGuard)
export class ApiNodeResolver {
  constructor(private readonly nodeService: ApiNodeService) {}

  @Mutation(() => HarriotNodeEntity)
  async createNode(
    @Args('input') input: CreateNodeInput,
  ): Promise<HarriotNodeEntity> {
    return this.nodeService.create(input);
  }

  @Query(() => [HarriotNodeEntity])
  async findAllNodes(): Promise<HarriotNodeEntity[]> {
    return this.nodeService.find();
  }

  @Query(() => HarriotNodeEntity)
  async findNodeByPublicKey(
    @Args({ name: 'public_key', type: () => ID }) public_key: string,
  ): Promise<HarriotNodeEntity> {
    return this.nodeService.findOneByPublicKey(public_key);
  }

  @Mutation(() => HarriotNodeEntity)
  async updateNode(
    @Args({ name: 'public_key', type: () => ID }) public_key: string,
    @Args('input') input: UpdateNodeInput,
  ): Promise<HarriotNodeEntity> {
    return this.nodeService.update(public_key, input);
  }
}
