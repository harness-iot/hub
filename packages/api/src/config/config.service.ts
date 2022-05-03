import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private configService: NestConfigService) {}

  get BASE_DIR() {
    return this.configService.get<string>('BASE_DIR');
  }

  get DEVICE_NAME() {
    return this.configService.get<string>('DEVICE_NAME');
  }

  get PROTOCOL() {
    return this.configService.get<string>('PROTOCOL');
  }

  get PORT() {
    return this.configService.get<number>('PORT');
  }

  get BASE_HOST() {
    return this.configService.get<string>('BASE_HOST');
  }

  get PUBLIC_DIR() {
    return this.configService.get<string>('PUBLIC_DIR');
  }

  get DB_NAME() {
    return this.configService.get<string>('DB_NAME');
  }

  get REDIS_PORT() {
    return this.configService.get<number>('REDIS_PORT');
  }

  get BLE_SERVICE_UUID() {
    return this.configService.get<string>('BLE_SERVICE_UUID');
  }

  get BLE_CHAR_AUTH_UUID() {
    return this.configService.get<string>('BLE_CHAR_AUTH_UUID');
  }

  get BLE_CHAR_WIFI_UUID() {
    return this.configService.get<string>('BLE_CHAR_WIFI_UUID');
  }

  get BLE_CHAR_WIFI_CONN_UUID() {
    return this.configService.get<string>('BLE_CHAR_WIFI_CONN_UUID');
  }

  get BLE_CHAR_HUBFI_SETUP_UUID() {
    return this.configService.get<string>('BLE_CHAR_HUBFI_SETUP_UUID');
  }

  get BLE_CHAR_NETWORK_TYPE_UUID() {
    return this.configService.get<string>('BLE_CHAR_NETWORK_TYPE_UUID');
  }

  get BLE_TROUBLESHOOT_CHAR_UUID() {
    return this.configService.get<string>('BLE_TROUBLESHOOT_CHAR_UUID');
  }

  get NETWORK_HUB_AP_IP() {
    return this.configService.get<string>('NETWORK_HUB_AP_IP');
  }

  get NETWORK_NODE_AP_IP() {
    return this.configService.get<string>('NETWORK_NODE_AP_IP');
  }

  get NODE_ENV() {
    return this.configService.get<string>('NODE_ENV');
  }
}
