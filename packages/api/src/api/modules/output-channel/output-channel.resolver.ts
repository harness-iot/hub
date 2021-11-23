import { UseGuards } from '@nestjs/common';
import { Resolver, Args, ID, Mutation, Query } from '@nestjs/graphql';

import { ApiAuthGuard } from '@harriot-api/auth/auth.guard';
import { MycodoOutputChannelEntity } from '@harriot-mycodo/modules/output-channel/output-channel.entity';

import { OutputChannelSettingsInput } from './inputs/settings.input';
import { OutputChannelStateInput } from './inputs/state.input';
import { ApiOutputChannelService } from './output-channel.service';

@Resolver('api/output-channel')
@UseGuards(ApiAuthGuard)
export class ApiOutputChannelResolver {
  constructor(private readonly outputChannelService: ApiOutputChannelService) {}

  @Mutation(() => String)
  async updateOutputChannelState(
    @Args({ name: 'output_id', type: () => ID }) output_id: string,
    @Args('input') input: OutputChannelStateInput,
  ): Promise<string> {
    return this.outputChannelService.updateState(output_id, input);
  }

  @Mutation(() => MycodoOutputChannelEntity)
  async updateOutputChannelSettings(
    @Args({ name: 'channel_id', type: () => ID }) channel_id: string,
    @Args('input') input: OutputChannelSettingsInput,
  ): Promise<MycodoOutputChannelEntity> {
    return this.outputChannelService.updateSettings(channel_id, input);
  }

  @Query(() => [MycodoOutputChannelEntity])
  async findAllOutputChannels(): Promise<MycodoOutputChannelEntity[]> {
    return this.outputChannelService.findAll();
  }

  @Query(() => MycodoOutputChannelEntity)
  async findOutputChannelById(
    @Args({ name: 'unique_id', type: () => ID }) unique_id: string,
  ): Promise<MycodoOutputChannelEntity> {
    return this.outputChannelService.findById(unique_id);
  }

  @Query(() => [MycodoOutputChannelEntity])
  async findOutputChannelsByOutputPublicKeys(
    @Args({ name: 'output_public_keys', type: () => [ID] })
    output_public_keys: string[],
  ): Promise<MycodoOutputChannelEntity[]> {
    return this.outputChannelService.findByOutputPublicKeys(output_public_keys);
  }
}
