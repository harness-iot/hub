import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private configService: NestConfigService) {}

  get HARRIOT_PATH() {
    return this.configService.get<string>('HARRIOT_PATH')!;
  }

  get ENVIRONMENT() {
    return this.configService.get<string>('ENVIRONMENT')!;
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

  get ENV_IS_DEVELOPMENT() {
    return this.configService.get<string>('ENVIRONMENT') === 'development';
  }
}
