import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';

import { ApiAuthGuard } from '@harriot-api/auth/auth.guard';
import { MycodoInputEntity } from '@harriot-mycodo/modules/input/input.entity';

import { MycodoInputDto } from './dto/input.dto';
import { UpdateInputSettingsDto } from './dto/update.dto';
import { ApiInputService } from './input.service';
import { UpdateInputSettingsInput } from './inputs/update.input';

@Resolver('api/input')
@UseGuards(ApiAuthGuard)
export class ApiInputResolver {
  constructor(private readonly inputService: ApiInputService) {}

  // delete
  @Query(() => MycodoInputEntity)
  async findInputSettings(
    @Args({ name: 'unique_id', type: () => ID }) unique_id: string,
  ): Promise<MycodoInputEntity> {
    return this.inputService.findOne(unique_id);
  }

  @Query(() => MycodoInputDto)
  async findInput(
    @Args({ name: 'unique_id', type: () => ID }) unique_id: string,
  ): Promise<MycodoInputDto> {
    return this.inputService.findById(unique_id);
  }

  @Mutation(() => UpdateInputSettingsDto)
  async updateInputSettings(
    @Args({ name: 'unique_id', type: () => ID }) unique_id: string,
    @Args('input') input: UpdateInputSettingsInput,
  ): Promise<UpdateInputSettingsDto> {
    return this.inputService.update(unique_id, input);
  }
}
