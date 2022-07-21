import { Module } from '@nestjs/common';

import { UserModule } from '@harriot-modules/user/user.module';

import { NativeNetworkModule } from '@harness-api/native/network/network.module';

import { HubNetworkRouteResolver } from './network.resolver';
import { HubNetworkRouteService } from './network.service';

@Module({
  imports: [UserModule, NativeNetworkModule],
  providers: [HubNetworkRouteService, HubNetworkRouteResolver],
})
export class HubNetworkRouteModule {}
