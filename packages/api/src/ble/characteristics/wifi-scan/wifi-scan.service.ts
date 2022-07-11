import bleno from '@abandonware/bleno';
import { Injectable } from '@nestjs/common';

import { ConfigService } from '@harriot-config/config.service';
import { NetworkService } from '@harriot-network/network.service';
import { wifiSignalUtil } from '@harriot-utils/wifi.util';
import { WifiService } from '@harriot-wifi/wifi.service';

import { WifiNetwork } from '@harness-api/native/network/network.interface';
import { NativeNetworkService } from '@harness-api/native/network/network.service';

@Injectable()
export class BleCharWifiScanService {
  constructor(
    private readonly configService: ConfigService,
    private readonly wifiService: WifiService,
    private readonly networkService: NetworkService,
    private readonly nativeNetworkService: NativeNetworkService,
  ) {}

  private async scan(init: boolean): Promise<WifiNetwork[]> {
    return this.nativeNetworkService.scan();
    // try {
    //   const networks = await this.wifiService.scan();

    //   return networks;
    // } catch (error) {
    //   if (error instanceof Error) {
    //     console.log('ERRROROR: ', error.message);
    //     if (
    //       error.message.includes("Interface doesn't support scanning") &&
    //       init
    //     ) {
    //       await this.networkService.setNetworkType('wifi');
    //       return this.scan(false);
    //     }
    //   }
    //   throw error;
    // }
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
            const scan = await self.scan(true);

            // Filtering out dupes, undefined ssid, hidden networks
            this.value = scan
              .filter(
                (s, index, self) =>
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
