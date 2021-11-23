import bleno from '@abandonware/bleno';
import { Injectable } from '@nestjs/common';

import { ConfigService } from '@harriot-config/config.service';
import { WifiService } from '@harriot-wifi/wifi.service';

@Injectable()
export class BleCharTroubleshootService {
  constructor(
    private readonly configService: ConfigService,
    private readonly wifiService: WifiService,
  ) {}

  static numberGen = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  public init(): InstanceType<typeof bleno.Characteristic> {
    return new bleno.Characteristic({
      value: null,
      uuid: this.configService.BLE_TROUBLESHOOT_CHAR_UUID,
      properties: ['read'],
      onReadRequest: async (_offset, callback) => {
        const ssid = await this.wifiService.getSSID();
        const result = JSON.stringify({ ssid: ssid || '' });
        callback(bleno.Characteristic.RESULT_SUCCESS, Buffer.from(result));
      },
    });
  }
}
