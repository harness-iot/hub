import bleno from '@abandonware/bleno';
import { Injectable } from '@nestjs/common';

import { ConfigService } from '@harriot-config/config.service';

import { OSNetworkService } from '@harness-api/os/network/network.service';

@Injectable()
export class BleCharAuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly networkService: OSNetworkService,
  ) {}

  public init(): InstanceType<typeof bleno.Characteristic> {
    return new bleno.Characteristic({
      value: null,
      uuid: this.configService.BLE_CHAR_AUTH_UUID,
      properties: ['read'],
      onReadRequest: async (_, callback) => {
        try {
          const api_key = process.env.HARNESS_API_KEY;

          // Check if IP address is available to test network connectivity
          const ip_addr = await this.networkService.get_ip_address();

          const buffer = Buffer.from(JSON.stringify({ api_key, ip_addr }));
          callback(bleno.Characteristic.RESULT_SUCCESS, buffer);
        } catch (err) {
          console.log('[BleCharAuthService:error]', err);
          callback(bleno.Characteristic.RESULT_UNLIKELY_ERROR);
        }
      },
    });
  }
}
