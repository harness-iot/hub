import { Module } from '@nestjs/common';

import { BleCharAuthModule } from './auth/auth.module';
import { BleCharacteristicsService } from './characteristics.service';
import { BleCharHubfiSetupModule } from './hubfi-setup/hubfi-setup.module';
import { BleCharNetworkTypeModule } from './network-type/network-type.module';
import { BleCharTroubleshootModule } from './troubleshoot/troubleshoot.module';
import { BleCharWifiConnectModule } from './wifi-connect/wifi-connect.module';
import { BleCharWifiScanModule } from './wifi-scan/wifi-scan.module';

@Module({
  imports: [
    BleCharAuthModule,
    BleCharWifiScanModule,
    BleCharWifiConnectModule,
    BleCharHubfiSetupModule,
    BleCharNetworkTypeModule,
    BleCharTroubleshootModule,
  ],
  providers: [BleCharacteristicsService],
  exports: [BleCharacteristicsService],
})
export class BleCharacteristicsModule {}
