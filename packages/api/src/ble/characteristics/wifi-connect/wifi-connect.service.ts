import bleno from '@abandonware/bleno';
import { Injectable } from '@nestjs/common';
import retry from 'async-retry';

import { ConfigService } from '@harriot-config/config.service';
import { HarriotConfigService } from '@harriot-core/modules/config/config.service';
import { NetworkService } from '@harriot-network/network.service';
import { WifiService } from '@harriot-wifi/wifi.service';

@Injectable()
export class BleCharWifiConnectService {
  constructor(
    private readonly configService: ConfigService,
    protected readonly harriotConfigService: HarriotConfigService,
    protected readonly networkService: NetworkService,
    private readonly wifiService: WifiService,
  ) {}

  private async unwindWifi(ssid: string): Promise<void> {
    await this.wifiService.disable(ssid);
    await this.wifiService.setConfiguration();
  }

  // Raspberry Pi interface update does not update immediately
  private async isWifiConnected(): Promise<void> {
    return retry(
      async (bail) => {
        let ip: string | null = null;
        try {
          ip = await this.networkService.getHubIp();
        } catch (err) {
          // immediately bail if wifiService throws error
          bail(new Error('connection_error'));
        }

        if (!ip) {
          // Don't catch as this will keep retrying
          throw Error('invalid_password');
        }

        return;
      },
      {
        retries: 8,
        maxTimeout: 2000,
      },
    );
  }

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
            // Set interface to wifi, not access point
            await this.networkService.setNetworkType('wifi');
          }

          await this.wifiService.enable(ssid, password);
          await this.wifiService.setConfiguration();
          await this.isWifiConnected();
          await this.harriotConfigService.setNetworkType('WIFI');
          response = 'success';
          callback(bleno.Characteristic.RESULT_SUCCESS);
        } catch (err) {
          console.error('[BleCharWifiConnectService.init]', err);

          // remote network details from wpa_supplicant
          // run wlan0 reconfigure
          await this.unwindWifi(ssid);

          if (err.message === 'invalid_password') {
            response = 'invalid_password';
            callback(bleno.Characteristic.RESULT_SUCCESS);
            return;
          }

          callback(bleno.Characteristic.RESULT_UNLIKELY_ERROR);
        }
      },
      onReadRequest: async (_offset, callback) => {
        callback(bleno.Characteristic.RESULT_SUCCESS, Buffer.from(response));
      },
    });
  }
}
