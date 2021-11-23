import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query, ID } from '@nestjs/graphql';

import { ApiAuthGuard } from '@harriot-api/auth/auth.guard';

import { MycodoAllOutputsDto, MycodoOutputDto } from './dto/output.dto';
import { ApiOutputService } from './output.service';

@Resolver('api/output')
@UseGuards(ApiAuthGuard)
export class ApiOutputResolver {
  constructor(private readonly outputService: ApiOutputService) {}

  @Query(() => MycodoOutputDto)
  async findOutput(
    @Args({ name: 'mycodo_id', type: () => ID }) mycodo_id: string,
  ): Promise<MycodoOutputDto> {
    return this.outputService.findById(mycodo_id);
  }

  @Query(() => MycodoAllOutputsDto)
  async findAllOutputs(): Promise<MycodoAllOutputsDto> {
    return this.outputService.findAll();
  }
}
