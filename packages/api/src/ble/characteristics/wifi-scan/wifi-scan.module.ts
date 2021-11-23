import { Module } from '@nestjs/common';

import { NetworkModule } from '@harriot-network/network.module';
import { WifiModule } from '@harriot-wifi/wifi.module';

import { BleCharWifiScanService } from './wifi-scan.service';

@Module({
  imports: [WifiModule, NetworkModule],
  providers: [BleCharWifiScanService],
  exports: [BleCharWifiScanService],
})
export class BleCharWifiScanModule {}
