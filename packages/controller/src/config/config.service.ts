import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private configService: NestConfigService) {}

  get BASE_DIR() {
    return this.configService.get<string>('BASE_DIR')!;
  }

  get NODE_ENV() {
    return this.configService.get<string>('NODE_ENV')!;
  }

  get MQTT_PROTOCOL() {
    return this.configService.get<string>('MQTT_PROTOCOL')!;
  }

  get MQTT_HOST() {
    return this.configService.get<string>('MQTT_HOST')!;
  }

  get MQTT_PORT() {
    return this.configService.get<number>('MQTT_PORT')!;
  }

  get DB_PATH() {
    return this.configService.get<string>('DB_PATH')!;
  }

  get REDIS_HOST() {
    return this.configService.get<string>('REDIS_HOST')!;
  }

  get REDIS_PORT() {
    return this.configService.get<number>('REDIS_PORT')!;
  }

  get ENV_IS_DEVELOPMENT() {
    return this.configService.get<string>('NODE_ENV') === 'development';
  }
}
