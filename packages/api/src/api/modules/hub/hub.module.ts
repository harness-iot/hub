import { Module } from '@nestjs/common';

import { HarriotConfigModule } from '@harriot-core/modules/config/config.module';
import { HarriotRoleModule } from '@harriot-core/modules/role/role.module';
import { HarriotUserModule } from '@harriot-core/modules/user/user.module';
import { MycodoUserModule } from '@harriot-mycodo/modules/user/user.module';

import { ApiHubResolver } from './hub.resolver';
import { ApiHubService } from './hub.service';

@Module({
  imports: [
    HarriotConfigModule,
    HarriotUserModule,
    HarriotRoleModule,
    MycodoUserModule,
  ],
  providers: [ApiHubResolver, ApiHubService],
})
export class ApiHubModule {}
