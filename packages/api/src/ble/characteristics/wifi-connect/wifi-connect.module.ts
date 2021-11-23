import { Module } from '@nestjs/common';

import { HarriotConfigModule } from '@harriot-core/modules/config/config.module';
import { NetworkModule } from '@harriot-network/network.module';
import { WifiModule } from '@harriot-wifi/wifi.module';

import { BleCharWifiConnectService } from './wifi-connect.service';

@Module({
  imports: [WifiModule, NetworkModule, HarriotConfigModule],
  providers: [BleCharWifiConnectService],
  exports: [BleCharWifiConnectService],
})
export class BleCharWifiConnectModule {}
