import { exec } from 'child_process';

import { Injectable } from '@nestjs/common';

import { ConfigService } from '@harriot-config/config.service';

@Injectable()
export class NetworkService {
  private script: string;

  constructor(protected readonly configService: ConfigService) {
    this.script = `${configService.BASE_DIR}/packages/api/scripts/`;
  }

  public async getHubNetworkType(): Promise<'hubfi' | 'wifi'> {
    return new Promise((resolve, reject) =>
      exec(
        `bash ${this.script}network.sh getHubNetworkType`,
        (error, stdout, stderr) => {
          try {
            if (error || stderr) {
              throw error || stderr;
            }

            const network = stdout.trim();

            if (network !== 'hubfi' && network !== 'wifi') {
              throw Error('invalid network type');
            }

            return resolve(network);
          } catch (err) {
            return reject(err);
          }
        },
      ),
    );
  }

  public async setNetworkType(type: 'hubfi' | 'wifi'): Promise<void> {
    return new Promise((resolve, reject) =>
      exec(
        `bash ${this.script}network.sh setHubNetworkType ${type}`,
        (error, _stdout, stderr) => {
          if (error || stderr) {
            return reject(error || stderr);
          }

          return resolve();
        },
      ),
    );
  }

  public async getHubIp(): Promise<string | undefined> {
    return new Promise((resolve, reject) =>
      exec(
        `bash ${this.script}network_util.sh getInterfaceIpAddress wlan1`,
        (error, stdout, stderr) => {
          if (error || stderr) {
            return reject(error || stderr);
          }

          return resolve(stdout.trim());
        },
      ),
    );
  }
}
