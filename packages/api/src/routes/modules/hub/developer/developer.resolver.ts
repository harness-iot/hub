import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { AuthRole } from '@harness-api/modules/role/role.decorator';
import { HubInstanceRoleEnum } from '@harness-api/modules/role/role.enum';
import { RolesGuard } from '@harness-api/modules/role/role.guard';

import { HubDeveloperRouteService } from './developer.service';
import { DeveloperLogDto } from './dto/log.dto';
import { InstanceGetDeveloperLogsInput } from './inputs/get-logs.input';

@Resolver('route/hub/developer')
export class HubDeveloperRouteResolver {
  constructor(protected readonly developerService: HubDeveloperRouteService) {}

  @AuthRole(HubInstanceRoleEnum.MANAGER)
  @UseGuards(RolesGuard)
  @Query(() => [DeveloperLogDto])
  async instanceGetDeveloperLogs(
    @Args('input') input: InstanceGetDeveloperLogsInput,
  ): Promise<DeveloperLogDto[]> {
    return this.developerService.getLogs(input);
  }
}
