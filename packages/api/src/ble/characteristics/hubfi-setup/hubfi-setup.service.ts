import { exec } from 'child_process';

import bleno from '@abandonware/bleno';
import { Injectable } from '@nestjs/common';
import retry from 'async-retry';

import { ConfigService } from '@harriot-config/config.service';
import { HubService } from '@harriot-modules/hub/hub.service';
import { NetworkService } from '@harriot-network/network.service';

@Injectable()
export class BleCharHubfiSetupService {
  private scriptPath: string;

  constructor(
    private readonly configService: ConfigService,
    protected readonly hubService: HubService,
    protected readonly networkService: NetworkService,
  ) {
    this.scriptPath = `${configService.HARRIOT_PATH}/packages/api/scripts/`;
  }

  private async isNetworkUp(): Promise<void> {
    return retry(
      async (bail) => {
        let ip: string | null = null;
        try {
          ip = await this.networkService.getHubIp();
          console.log('NETWORK TRY: ', ip);
        } catch (err) {
          // immediately bail if wifiService throws error
          bail(new Error('connection_error'));
        }

        if (!ip) {
          // Don't catch as this will keep retrying
          throw Error('network_unavailable');
        }

        return;
      },
      {
        retries: 8,
        maxTimeout: 2000,
      },
    );
  }

  private async setApCredentials(ssid: string, pw: string): Promise<void> {
    return new Promise((resolve, reject) =>
      exec(
        `bash ${this.scriptPath}network.sh setAPCredentials hub ${ssid} ${pw}`,
        (error, _stdout, stderr) => {
          if (error || stderr) {
            return reject(error || stderr);
          }

          return resolve();
        },
      ),
    );
  }

  private async restartNetworkInterface(): Promise<void> {
    return new Promise((resolve, reject) =>
      exec(
        `bash ${this.scriptPath}network.sh restartHostapdInterface hub`,
        (error, _stdout, stderr) => {
          if (error || stderr) {
            return reject(error || stderr);
          }

          return resolve();
        },
      ),
    );
  }

  public init(): InstanceType<typeof bleno.Characteristic> {
    return new bleno.Characteristic({
      value: null,
      uuid: this.configService.BLE_CHAR_HUBFI_SETUP_UUID,
      properties: ['write'],
      onWriteRequest: async (data, _, __, callback) => {
        const buffer = Buffer.from(data);
        const credsRaw = buffer.toString();
        const { ssid, password } = JSON.parse(credsRaw) as {
          ssid: string;
          password: string;
        };

        console.log(
          '[BleCharHubfiSetupService.init] params:',
          `ssid: ${ssid}, pw: ${password}`,
        );

        try {
          const networkType = await this.networkService.getHubNetworkType();

          if (networkType !== 'hubfi') {
            // Set interface to ap, not wifi
            await this.networkService.setNetworkType('hubfi');
          }

          await this.setApCredentials(ssid, password);
          await this.restartNetworkInterface();
          await this.isNetworkUp();
          await this.hubService.setNetworkType('HUBFI');
          callback(bleno.Characteristic.RESULT_SUCCESS);
        } catch (err) {
          console.error('[BleCharHubfiSetupService.init]', err);
          callback(bleno.Characteristic.RESULT_UNLIKELY_ERROR);
        }
      },
    });
  }
}
