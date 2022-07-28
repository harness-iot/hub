import bleno from '@abandonware/bleno';
import { Injectable } from '@nestjs/common';

import { ConfigService } from '@harriot-config/config.service';
import { wifiSignalUtil } from '@harriot-utils/wifi.util';

import { WifiNetwork } from '@harness-api/os/network/network.interface';
import { OSNetworkService } from '@harness-api/os/network/network.service';

@Injectable()
export class BleCharWifiScanService {
  constructor(
    private readonly configService: ConfigService,
    private readonly networkService: OSNetworkService,
  ) {}

  private async scan(): Promise<WifiNetwork[]> {
    return this.networkService.scan();
  }

  public init(): InstanceType<typeof bleno.Characteristic> {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    return new bleno.Characteristic({
      value: null,
      uuid: this.configService.BLE_CHAR_WIFI_UUID,
      properties: ['read'],
      onReadRequest: async function (offset, callback) {
        try {
          if (offset === 0) {
            this.value = null;
            const scan = await self.scan();

            // Filtering out dupes, undefined ssid, hidden networks
            this.value = scan
              .filter(
                (s, index, self) =>
                  s.ssid &&
                  self.findIndex((t) => t.ssid === s.ssid) === index &&
                  (typeof s.ssid === 'undefined' || !s.ssid.includes('\\x00')),
              )
              .map((s) => {
                return { ssid: s.ssid, signal: wifiSignalUtil(s.signal) };
              });
          }

          const result = JSON.stringify(this.value).slice(offset);

          if (offset > result.length) {
            this.value = null;
          }

          callback(bleno.Characteristic.RESULT_SUCCESS, Buffer.from(result));
        } catch (err) {
          console.log('WIFI READ ERR', err);
          callback(bleno.Characteristic.RESULT_UNLIKELY_ERROR);
        }
      },
    });
  }
}
