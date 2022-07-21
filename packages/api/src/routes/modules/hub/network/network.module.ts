import { Module } from '@nestjs/common';

import { UserModule } from '@harriot-modules/user/user.module';

import { OSNetworkModule } from '@harness-api/os/network/network.module';

import { HubNetworkRouteResolver } from './network.resolver';
import { HubNetworkRouteService } from './network.service';

@Module({
  imports: [UserModule, OSNetworkModule],
  providers: [HubNetworkRouteService, HubNetworkRouteResolver],
})
export class HubNetworkRouteModule {}
