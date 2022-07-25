import { Module } from '@nestjs/common';

import { HubDeveloperRouteModule } from './developer/developer.module';
import { HubInstanceRouteModule } from './instance/instance.module';
import { HubNetworkRouteModule } from './network/network.module';

@Module({
  imports: [
    HubInstanceRouteModule,
    HubNetworkRouteModule,
    HubDeveloperRouteModule,
  ],
})
export class HubRouteModule {}
