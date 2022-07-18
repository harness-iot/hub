import { Module } from '@nestjs/common';

import { RoleModule } from '@harriot-modules/role/role.module';
import { UserModule } from '@harriot-modules/user/user.module';

import { NativeNetworkModule } from '@harness-api/native/network/network.module';

import { HubNetworkRouteResolver } from './network.resolver';
import { HubNetworkRouteService } from './network.service';

@Module({
  imports: [UserModule, RoleModule, NativeNetworkModule],
  providers: [HubNetworkRouteService, HubNetworkRouteResolver],
})
export class HubNetworkRouteModule {}
