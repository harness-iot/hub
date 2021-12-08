import { Module } from '@nestjs/common';

import { HubInstanceRouteModule } from './instance/instance.module';
import { HubNetworkRouteModule } from './network/network.module';

@Module({
  imports: [HubInstanceRouteModule, HubNetworkRouteModule],
})
export class HubRouteModule {}
