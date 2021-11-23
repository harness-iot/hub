import bleno from '@abandonware/bleno';
import { Injectable } from '@nestjs/common';

import { BleCharAuthService } from './auth/auth.service';
import { BleCharHubfiSetupService } from './hubfi-setup/hubfi-setup.service';
import { BleCharNetworkTypeService } from './network-type/network-type.service';
import { BleCharTroubleshootService } from './troubleshoot/troubleshoot.service';
import { BleCharWifiConnectService } from './wifi-connect/wifi-connect.service';
import { BleCharWifiScanService } from './wifi-scan/wifi-scan.service';

@Injectable()
export class BleCharacteristicsService {
  constructor(
    private readonly authChar: BleCharAuthService,
    private readonly wifiScanChar: BleCharWifiScanService,
    private readonly wifiConnectChar: BleCharWifiConnectService,
    private readonly hubfiSetupChar: BleCharHubfiSetupService,
    private readonly networkTypeChar: BleCharNetworkTypeService,
    private readonly troubleshootChar: BleCharTroubleshootService,
  ) {}

  public all(): InstanceType<typeof bleno.Characteristic>[] {
    return [
      this.authChar.init(),
      this.wifiScanChar.init(),
      this.wifiConnectChar.init(),
      this.hubfiSetupChar.init(),
      this.networkTypeChar.init(),
      this.troubleshootChar.init(),
    ];
  }
}
