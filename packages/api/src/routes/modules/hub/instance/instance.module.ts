import { Module } from '@nestjs/common';

import { HubModule } from '@harriot-modules/hub/hub.module';
import { RoleModule } from '@harriot-modules/role/role.module';
import { UserModule } from '@harriot-modules/user/user.module';

import { HubInstanceRouteResolver } from './instance.resolver';
import { HubInstanceRouteService } from './instance.service';

@Module({
  imports: [HubModule, UserModule, RoleModule],
  providers: [HubInstanceRouteService, HubInstanceRouteResolver],
})
export class HubInstanceRouteModule {}
