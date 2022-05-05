import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { ConfigService } from './config.service';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [
        () => ({
          BASE_DIR: '/home/homie/hub',
          BASE_HOST: 'localhost',
          DB_NAME: 'db.sqlite',
          MQTT_PROTOCOL: 'MQTT',
          MQTT_PORT: 1883,
          REDIS_PORT: 6379,
        }),
      ],
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
