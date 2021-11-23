import { Iproute2Service } from './iproute2.service';
import { IwgetidService } from './iwgetid.service';
import { IwlistService } from './iwlist.service';
import { SupplicantService } from './supplicant.service';
import { WpaCliService } from './wpa-cli.service';

export const wifiProviders = [
  IwlistService,
  SupplicantService,
  WpaCliService,
  Iproute2Service,
  IwgetidService,
];
