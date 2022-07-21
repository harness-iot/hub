import { Module } from '@nestjs/common';

import { OSNetworkModule } from '@harness-api/os/network/network.module';

import { BleCharWifiScanService } from './wifi-scan.service';

@Module({
  imports: [OSNetworkModule],
  providers: [BleCharWifiScanService],
  exports: [BleCharWifiScanService],
})
export class BleCharWifiScanModule {}
