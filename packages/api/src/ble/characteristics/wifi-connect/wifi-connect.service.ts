import bleno from '@abandonware/bleno';
import { Injectable } from '@nestjs/common';

import { ConfigService } from '@harriot-config/config.service';
import { HubService } from '@harriot-modules/hub/hub.service';

import { OSNetworkService } from '@harness-api/os/network/network.service';
import { NetworkIp4AddressTypeEnum } from '@harness-api/routes/modules/hub/network/enums/input.enum';

@Injectable()
export class BleCharWifiConnectService {
  constructor(
    private readonly configService: ConfigService,
    protected readonly hubService: HubService,
    private readonly networkService: OSNetworkService,
  ) {}

  public init(): InstanceType<typeof bleno.Characteristic> {
    let response: { status: 'success' | 'invalid_password'; ip?: string };
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
          const connect = await this.networkService.connect_to_wifi(
            ssid,
            password,
          );

          if (connect) {
            // After successfully connecting to new WiFi network we will check if hub IP mode is static (previously set)
            // and, if so, change it to dynamic (user can always set static ip when setting up hub or in settings)
            const network_details =
              await this.networkService.get_network_details();

            if (!network_details) {
              throw Error('Network not found');
            }

            if (
              network_details.ip4_address_type ===
              NetworkIp4AddressTypeEnum.STATIC
            ) {
              await this.networkService.set_ip_address_dynamic();
            }

            response = { status: 'success', ip: network_details.ip4_address };
            return callback(bleno.Characteristic.RESULT_SUCCESS);
          }

          response = { status: 'invalid_password' };
          callback(bleno.Characteristic.RESULT_SUCCESS);
        } catch (err) {
          // Unexpected error
          console.error('[BleCharWifiConnectService.init]', err);
          callback(bleno.Characteristic.RESULT_UNLIKELY_ERROR);
        }
      },
      onReadRequest: async (_offset, callback) => {
        callback(
          bleno.Characteristic.RESULT_SUCCESS,
          Buffer.from(JSON.stringify(response)),
        );
      },
    });
  }
}
