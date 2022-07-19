import { Injectable } from '@nestjs/common';

import { ConfigService } from '@harriot-config/config.service';

import { NetworkSettingsDetailsUnion } from '@harness-api/routes/modules/hub/network/dto/details.dto';

import { Ubuntu2204NetworkService } from '../os/ubuntu_22.04/network/network.service';

import { WifiNetwork } from './network.interface';

// Will eventually move this somewhere else when there are other options
const UBUNTU_2204 = 'Ubuntu 22.04';

@Injectable()
export class NativeNetworkService {
  constructor(
    private readonly configService: ConfigService,
    private readonly ubuntu2204Service: Ubuntu2204NetworkService,
  ) {}

  public async scan(): Promise<WifiNetwork[]> {
    if (this.configService.OS_VERSION === UBUNTU_2204) {
      return this.ubuntu2204Service.scan();
    }

    throw Error('OS Version not supported');
  }

  public async get_ip_address(): Promise<string | null> {
    if (this.configService.OS_VERSION === UBUNTU_2204) {
      return this.ubuntu2204Service.get_ip_address();
    }

    throw Error('OS Version not supported');
  }

  public async get_active_ssid(): Promise<string | null> {
    if (this.configService.OS_VERSION === UBUNTU_2204) {
      return this.ubuntu2204Service.get_active_ssid();
    }

    throw Error('OS Version not supported');
  }

  public async connect_to_wifi(
    ssid: string,
    password: string,
  ): Promise<boolean> {
    if (this.configService.OS_VERSION === UBUNTU_2204) {
      return this.ubuntu2204Service.connect_to_wifi(ssid, password);
    }

    throw Error('OS Version not supported');
  }

  public async get_network_details(): Promise<
    typeof NetworkSettingsDetailsUnion
  > {
    if (this.configService.OS_VERSION === UBUNTU_2204) {
      return this.ubuntu2204Service.get_network_details();
    }

    throw Error('OS Version not supported');
  }
}
