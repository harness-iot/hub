import envalid from 'envalid';

import { IConfig } from './config.interface';

export class ConfigService {
  private readonly envConfig: IConfig;

  constructor(dotEnvPath: string) {
    this.envConfig = this.validate(dotEnvPath);
  }

  get PROTOCOL(): string {
    return this.envConfig.PROTOCOL;
  }

  get PORT(): number {
    return Number(this.envConfig.PORT);
  }

  get BASE_HOST(): string {
    return this.envConfig.BASE_HOST;
  }

  get PUBLIC_DIR(): string {
    return this.envConfig.PUBLIC_DIR;
  }

  // HARRIOT

  get HARRIOT_PATH(): string {
    return this.envConfig.HARRIOT_PATH;
  }

  get DEVICE_NAME(): string {
    return this.envConfig.DEVICE_NAME;
  }

  get DB_PATH(): string {
    return this.envConfig.DB_PATH;
  }

  get REDIS_HOST(): string {
    return this.envConfig.REDIS_HOST;
  }

  get REDIS_PORT(): number {
    return Number(this.envConfig.REDIS_PORT);
  }

  // MYCODO

  get MYCODO_DB_PATH(): string {
    return this.envConfig.MYCODO_DB_PATH;
  }

  // BLE

  get BLE_SERVICE_UUID(): string {
    return this.envConfig.BLE_SERVICE_UUID;
  }

  get BLE_CHAR_AUTH_UUID(): string {
    return this.envConfig.BLE_CHAR_AUTH_UUID;
  }

  get BLE_CHAR_WIFI_UUID(): string {
    return this.envConfig.BLE_CHAR_WIFI_UUID;
  }

  get BLE_CHAR_WIFI_CONN_UUID(): string {
    return this.envConfig.BLE_CHAR_WIFI_CONN_UUID;
  }

  get BLE_CHAR_HUBFI_SETUP_UUID(): string {
    return this.envConfig.BLE_CHAR_HUBFI_SETUP_UUID;
  }

  get BLE_CHAR_NETWORK_TYPE_UUID(): string {
    return this.envConfig.BLE_CHAR_NETWORK_TYPE_UUID;
  }

  get BLE_TROUBLESHOOT_CHAR_UUID(): string {
    return this.envConfig.BLE_TROUBLESHOOT_CHAR_UUID;
  }

  get NETWORK_HUB_AP_IP(): string {
    return this.envConfig.NETWORK_HUB_AP_IP;
  }

  get NETWORK_NODE_AP_IP(): string {
    return this.envConfig.NETWORK_NODE_AP_IP;
  }

  // ENV (envalid defaults)

  get isProduction(): boolean {
    return this.envConfig.isProduction;
  }

  get isDev(): boolean {
    return this.envConfig.isDev;
  }

  get isTest(): boolean {
    return this.envConfig.isTest;
  }

  private validate(dotEnvPath: string): IConfig {
    const rule = {
      PROTOCOL: envalid.str({ choices: ['http', 'https'], default: 'http' }),
      PORT: envalid.port(),
      BASE_HOST: envalid.str(),
      PUBLIC_DIR: envalid.str(),
      // HARRIOT
      HARRIOT_PATH: envalid.str(),
      DEVICE_NAME: envalid.str(),
      DB_PATH: envalid.str(),
      REDIS_HOST: envalid.str(),
      REDIS_PORT: envalid.port(),
      // MYCODO
      MYCODO_DB_PATH: envalid.str(),
      // BLE
      BLE_SERVICE_UUID: envalid.str(),
      BLE_CHAR_AUTH_UUID: envalid.str(),
      BLE_CHAR_WIFI_UUID: envalid.str(),
      BLE_CHAR_WIFI_CONN_UUID: envalid.str(),
      BLE_CHAR_HUBFI_SETUP_UUID: envalid.str(),
      BLE_CHAR_NETWORK_TYPE_UUID: envalid.str(),

      BLE_TROUBLESHOOT_CHAR_UUID: envalid.str(),

      NETWORK_HUB_AP_IP: envalid.str(),
      NETWORK_NODE_AP_IP: envalid.str(),
    };

    return envalid.cleanEnv(process.env, rule, { dotEnvPath });
  }
}
