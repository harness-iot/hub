import { CleanEnv } from 'envalid';

export interface IConfig extends CleanEnv {
  PROTOCOL: string;
  PORT: number;
  BASE_HOST: string;
  PUBLIC_DIR: string;
  HARRIOT_PATH: string;
  DEVICE_NAME: string;
  DB_PATH: string;
  REDIS_HOST: string;
  REDIS_PORT: number;
  BLE_SERVICE_UUID: string;
  BLE_CHAR_AUTH_UUID: string;
  BLE_CHAR_WIFI_UUID: string;
  BLE_CHAR_WIFI_CONN_UUID: string;
  BLE_CHAR_HUBFI_SETUP_UUID: string;
  BLE_CHAR_NETWORK_TYPE_UUID: string;
  BLE_TROUBLESHOOT_CHAR_UUID: string;
  NETWORK_HUB_AP_IP: string;
  NETWORK_NODE_AP_IP: string;
}
