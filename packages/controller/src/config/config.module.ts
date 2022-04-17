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
        NODE_ENV: Joi.string()
          .valid('production', 'development', 'test')
          .required(),
        MQTT_PROTOCOL: Joi.string().required(),
        MQTT_HOST: Joi.string().required(),
        MQTT_PORT: Joi.number().positive().required(),
        DB_PATH: Joi.string().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().positive().required(),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
