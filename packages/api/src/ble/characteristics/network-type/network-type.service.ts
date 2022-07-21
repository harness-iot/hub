import bleno from '@abandonware/bleno';
import { Injectable } from '@nestjs/common';

import { ConfigService } from '@harriot-config/config.service';
import { HubService } from '@harriot-modules/hub/hub.service';

import { OSNetworkService } from '@harness-api/os/network/network.service';

@Injectable()
export class BleCharNetworkTypeService {
  constructor(
    private readonly configService: ConfigService,
    protected readonly hubService: HubService,
    protected readonly networkService: OSNetworkService,
  ) {}

  public init(): InstanceType<typeof bleno.Characteristic> {
    return new bleno.Characteristic({
      value: null,
      uuid: this.configService.BLE_CHAR_NETWORK_TYPE_UUID,
      properties: ['read'],
      onReadRequest: async (_offset, callback) => {
        try {
          // Type will be returned if hub has previously been setup
          const type = await this.hubService.getNetworkType();

          if (!type) {
            return callback(
              bleno.Characteristic.RESULT_SUCCESS,
              Buffer.from(JSON.stringify({ type, ssid: undefined })),
            );
          }

          const ssid = await this.networkService.get_active_ssid();
          callback(
            bleno.Characteristic.RESULT_SUCCESS,
            Buffer.from(JSON.stringify({ type, ssid })),
          );
        } catch (error) {
          console.error('[BleCharNetworkTypeService]', error);
          callback(bleno.Characteristic.RESULT_UNLIKELY_ERROR);
        }
      },
    });
  }
}
