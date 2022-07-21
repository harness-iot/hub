import { Module } from '@nestjs/common';

import { HubModule } from '@harriot-modules/hub/hub.module';

import { OSNetworkModule } from '@harness-api/os/network/network.module';

import { BleCharWifiConnectService } from './wifi-connect.service';

@Module({
  imports: [HubModule, OSNetworkModule],
  providers: [BleCharWifiConnectService],
  exports: [BleCharWifiConnectService],
})
export class BleCharWifiConnectModule {}
