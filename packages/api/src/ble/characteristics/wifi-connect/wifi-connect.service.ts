import bleno from '@abandonware/bleno';
import { Injectable } from '@nestjs/common';
import retry from 'async-retry';

import { ConfigService } from '@harriot-config/config.service';
import { HubService } from '@harriot-modules/hub/hub.service';
import { NetworkService } from '@harriot-network/network.service';
import { WifiService } from '@harriot-wifi/wifi.service';

import { NativeNetworkService } from '@harness-api/native/network/network.service';

@Injectable()
export class BleCharWifiConnectService {
  constructor(
    private readonly configService: ConfigService,
    protected readonly hubService: HubService,
    protected readonly networkService: NetworkService,
    private readonly wifiService: WifiService,
    private readonly nativeNetworkService: NativeNetworkService,
  ) {}

  public init(): InstanceType<typeof bleno.Characteristic> {
    let response: 'success' | 'invalid_password';
    return new bleno.Characteristic({
      value: null,
      uuid: this.configService.BLE_CHAR_WIFI_CONN_UUID,
      properties: ['read', 'write'],
      onWriteRequest: async (data, _, __, callback) => {
        const buffer = Buffer.from(data);
        const credsRaw = buffer.toString();
        const { ssid, password } = JSON.parse(credsRaw) as {
          ssid: string;
          password: string;
        };

        console.log(
          '[BleCharWifiConnectService.init] params:',
          `ssid: ${ssid}, pw: ${password}`,
        );

        try {
          const networkType = await this.networkService.getHubNetworkType();

          if (networkType !== 'wifi') {
            // Disabling for now.. 7/11
            // Set interface to wifi, not access point
            // await this.networkService.setNetworkType('wifi');
          }

          const connect = this.nativeNetworkService.connect_to_wifi(
            ssid,
            password,
          );

          if (connect) {
            await this.hubService.setNetworkType('WIFI');
            response = 'success';
            return callback(bleno.Characteristic.RESULT_SUCCESS);
          }

          response = 'invalid_password';
          callback(bleno.Characteristic.RESULT_SUCCESS);
        } catch (err) {
          // Unexpected error
          console.error('[BleCharWifiConnectService.init]', err);
          callback(bleno.Characteristic.RESULT_UNLIKELY_ERROR);
        }
      },
      onReadRequest: async (_offset, callback) => {
        callback(bleno.Characteristic.RESULT_SUCCESS, Buffer.from(response));
      },
    });
  }
}
