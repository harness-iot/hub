import { Module } from '@nestjs/common';

import { NetworkModule } from '@harriot-network/network.module';
import { WifiModule } from '@harriot-wifi/wifi.module';

import { NativeNetworkModule } from '@harness-api/native/network/network.module';

import { BleCharWifiScanService } from './wifi-scan.service';

@Module({
  imports: [WifiModule, NetworkModule, NativeNetworkModule],
  providers: [BleCharWifiScanService],
  exports: [BleCharWifiScanService],
})
export class BleCharWifiScanModule {}
