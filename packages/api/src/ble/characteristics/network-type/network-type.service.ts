import { exec } from 'child_process';

import bleno from '@abandonware/bleno';
import { Injectable } from '@nestjs/common';

import { ConfigService } from '@harriot-config/config.service';
import { HubService } from '@harriot-modules/hub/hub.service';

@Injectable()
export class BleCharNetworkTypeService {
  private script: string;

  constructor(
    private readonly configService: ConfigService,
    protected readonly hubService: HubService,
  ) {
    this.script = `${configService.BASE_DIR}/packages/api/scripts/network.sh`;
  }

  public async getNetworkCredentials(): Promise<{
    ssid: string;
    password: string;
  }> {
    return new Promise((resolve, reject) =>
      exec(
        `bash ${this.script} getAPCredentials hub`,
        (error, stdout, stderr) => {
          if (error || stderr) {
            return reject(error || stderr);
          }

          const creds = JSON.parse(stdout.trim());

          return resolve(creds);
        },
      ),
    );
  }

  public init(): InstanceType<typeof bleno.Characteristic> {
    return new bleno.Characteristic({
      value: null,
      uuid: this.configService.BLE_CHAR_NETWORK_TYPE_UUID,
      properties: ['read'],
      onReadRequest: async (_offset, callback) => {
        try {
          const type = await this.hubService.getNetworkType();
          const { ssid } = await this.getNetworkCredentials();
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
