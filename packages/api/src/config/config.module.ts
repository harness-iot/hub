import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { ConfigService } from './config.service';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [
        () => ({
          DEVICE_NAME: 'homie',
          BASE_DIR: '/home/homie/hub',
          PROTOCOL: 'http',
          PORT: 3000,
          BASE_HOST: 'localhost',
          PUBLIC_DIR: 'public',
          DB_NAME: 'homie.db',
          REDIS_PORT: 6379,
          BLE_SERVICE_UUID: '48a17dab-8cbe-43f8-8d76-e3928680806b',
          BLE_CHAR_AUTH_UUID: '51e5da74-dde4-4966-b710-fe72f48d8916',
          BLE_CHAR_WIFI_UUID: '4d97aad8-92d2-45fd-bc40-22f041c5ed05',
          BLE_CHAR_WIFI_CONN_UUID: 'b9adb4b7-822c-48b0-99d5-c07d5e38ae06',
          BLE_CHAR_HUBFI_SETUP_UUID: 'aade19c0-8acd-44e4-9a23-6d4cd794861b',
          BLE_CHAR_NETWORK_TYPE_UUID: 'd45d1c5f-337e-4c61-bdeb-67390860feba',
          BLE_TROUBLESHOOT_CHAR_UUID: 'bafa40fa-a56b-48fb-ac7b-b01963e65236',
          NETWORK_HUB_AP_IP: '192.168.5.1',
          NETWORK_NODE_AP_IP: '192.168.4.1',
        }),
      ],
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
