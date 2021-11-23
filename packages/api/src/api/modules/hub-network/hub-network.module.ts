import { Module } from '@nestjs/common';

import { HarriotRoleModule } from '@harriot-core/modules/role/role.module';
import { HarriotUserModule } from '@harriot-core/modules/user/user.module';

import { ApiHubNetworkResolver } from './hub-network.resolver';
import { ApiHubNetworkService } from './hub-network.service';

@Module({
  imports: [HarriotRoleModule, HarriotUserModule],
  providers: [ApiHubNetworkResolver, ApiHubNetworkService],
})
export class ApiHubNetworkModule {}
