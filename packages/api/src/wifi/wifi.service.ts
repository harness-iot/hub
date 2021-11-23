import { Injectable } from '@nestjs/common';

import { Iproute2Service } from './services/iproute2.service';
import { IwgetidService } from './services/iwgetid.service';
import { IwlistService } from './services/iwlist.service';
import { SupplicantService } from './services/supplicant.service';
import { WpaCliService } from './services/wpa-cli.service';

@Injectable()
export class WifiService {
  constructor(
    private readonly iwlist: IwlistService,
    private readonly supplicant: SupplicantService,
    private readonly wpacli: WpaCliService,
    private readonly iproute2: Iproute2Service,
    private readonly iwgetid: IwgetidService,
  ) {}

  public async scan() {
    return this.iwlist.scan();
  }

  public async enable(ssid: string, password: string) {
    return this.supplicant.enable(ssid, password);
  }

  public async disable(ssid: string) {
    return this.supplicant.disable(ssid);
  }

  public async setConfiguration() {
    return this.wpacli.reconfigure();
  }

  public async addr() {
    return this.iproute2.addr();
  }

  public async getSSID() {
    return this.iwgetid.ssid();
  }
}
