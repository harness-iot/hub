import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import Joi from 'joi';

import { ConfigService } from './config.service';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      validationSchema: Joi.object().keys({
        BASE_DIR: Joi.string().required(),
        DEVICE_NAME: Joi.string().required(),
        PROTOCOL: Joi.string().required(),
        PORT: Joi.number().positive().required(),
        BASE_HOST: Joi.string().required(),
        PUBLIC_DIR: Joi.string().required(),
        DB_PATH: Joi.string().required(),
        REDIS_PORT: Joi.number().positive().required(),
        BLE_SERVICE_UUID: Joi.string().required(),
        BLE_CHAR_AUTH_UUID: Joi.string().required(),
        BLE_CHAR_WIFI_UUID: Joi.string().required(),
        BLE_CHAR_WIFI_CONN_UUID: Joi.string().required(),
        BLE_CHAR_HUBFI_SETUP_UUID: Joi.string().required(),
        BLE_CHAR_NETWORK_TYPE_UUID: Joi.string().required(),
        BLE_TROUBLESHOOT_CHAR_UUID: Joi.string().required(),
        NETWORK_HUB_AP_IP: Joi.string().required(),
        NETWORK_NODE_AP_IP: Joi.string().required(),
        NODE_ENV: Joi.string()
          .valid('production', 'development', 'test')
          .required(),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
