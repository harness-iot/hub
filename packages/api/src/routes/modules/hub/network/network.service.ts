import { exec } from 'child_process';

import { Injectable } from '@nestjs/common';
import generatePassword from 'omgopass';
import { uniqueNamesGenerator, animals, names } from 'unique-names-generator';

import { ConfigService } from '@harriot-config/config.service';

import { NativeNetworkService } from '@harness-api/native/network/network.service';

import { ApCredentialsDto } from './dto/ap-credentials.dto';
import { NetworkSettingsDetailsUnion } from './dto/details.dto';
import { HubfiCredentialsInput } from './inputs/hubfi-credentials.input';

interface NetworkCredentials {
  ssid: string;
  password: string;
}

@Injectable()
export class HubNetworkRouteService {
  private script: string;

  constructor(
    protected readonly configService: ConfigService,
    protected readonly networkService: NativeNetworkService,
  ) {
    this.script = `${configService.BASE_DIR}/packages/api/scripts/network.sh`;
  }

  public async getHubNetworkType(): Promise<string> {
    return new Promise((resolve, reject) =>
      exec(`bash ${this.script} getHubNetworkType`, (error, stdout, stderr) => {
        if (error || stderr) {
          return reject(error || stderr);
        }

        return resolve(stdout.trim());
      }),
    );
  }

  private async restartHostapd(): Promise<void> {
    return new Promise((resolve, reject) =>
      exec(
        `bash ${this.script} restartHostapdInterface hub`,
        (error, _stdout, stderr) => {
          if (error || stderr) {
            return reject(error || stderr);
          }

          return resolve();
        },
      ),
    );
  }

  private async setApCredentials(ssid: string, pw: string): Promise<void> {
    return new Promise((resolve, reject) =>
      exec(
        `bash ${this.script} setAPCredentials hub ${ssid} ${pw}`,
        (error, _stdout, stderr) => {
          if (error || stderr) {
            return reject(error || stderr);
          }

          return resolve();
        },
      ),
    );
  }

  public async setNodeApCredentials(): Promise<ApCredentialsDto> {
    const ssid = uniqueNamesGenerator({
      dictionaries: [names, animals],
      separator: '-',
      length: 2,
      style: 'lowerCase',
    });

    const password = generatePassword();

    try {
      await this.setApCredentials(ssid, password);
      await this.restartHostapd();

      const ip = this.configService.NETWORK_NODE_AP_IP;

      return { ip, ssid, password };
    } catch (error) {
      throw error;
    }
  }

  public async getNodeApCredentials(): Promise<ApCredentialsDto> {
    return new Promise((resolve, reject) =>
      exec(
        `bash ${this.script} getAPCredentials node`,
        (error, stdout, stderr) => {
          if (error || stderr) {
            return reject(error || stderr);
          }

          const creds = JSON.parse(stdout.trim()) as NetworkCredentials;

          if (!creds.password || !creds.ssid) {
            throw Error('node ap credentials: password/ssid missing');
          }

          const ip = this.configService.NETWORK_NODE_AP_IP;

          return resolve({ ...creds, ip } as ApCredentialsDto);
        },
      ),
    );
  }

  public async setHubNetworkType(type: 'wifi' | 'ap'): Promise<boolean> {
    return new Promise((resolve, reject) =>
      exec(
        `bash ${this.script} setHubNetworkType ${type}`,
        (error, stdout, stderr) => {
          if (error || stderr) {
            return reject(error || stderr);
          }

          return resolve(true);
        },
      ),
    );
  }

  public async setHubAp({
    ssid,
    password,
  }: HubfiCredentialsInput): Promise<ApCredentialsDto> {
    try {
      await this.setApCredentials(ssid, password);
      await this.restartHostapd();

      const ip = this.configService.NETWORK_HUB_AP_IP;

      return { ip, ssid, password };
    } catch (error) {
      throw error;
    }
  }

  public async getHubFiSSID(): Promise<string> {
    return new Promise((resolve, reject) =>
      exec(
        `bash ${this.script} getAPCredentials hub`,
        (error, stdout, stderr) => {
          if (error || stderr) {
            return reject(error || stderr);
          }

          const credentials = JSON.parse(stdout.trim()) as NetworkCredentials;

          return resolve(credentials.ssid);
        },
      ),
    );
  }

  public async getDetails(): Promise<typeof NetworkSettingsDetailsUnion> {
    return this.networkService.get_network_details();
  }

  public async set_ip_address_static(static_ip: string): Promise<boolean> {
    return this.networkService.set_ip_address_static(static_ip);
  }

  public async set_ip_address_dynamic(): Promise<boolean> {
    return this.networkService.set_ip_address_dynamic();
  }
}
