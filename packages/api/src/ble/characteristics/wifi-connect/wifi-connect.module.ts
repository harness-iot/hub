import { Module } from '@nestjs/common';

import { HubModule } from '@harriot-modules/hub/hub.module';
import { NetworkModule } from '@harriot-network/network.module';
import { WifiModule } from '@harriot-wifi/wifi.module';

import { BleCharWifiConnectService } from './wifi-connect.service';

@Module({
  imports: [WifiModule, NetworkModule, HubModule],
  providers: [BleCharWifiConnectService],
  exports: [BleCharWifiConnectService],
})
export class BleCharWifiConnectModule {}
