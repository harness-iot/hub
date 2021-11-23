import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private configService: NestConfigService) {}

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

  get REDIS_HOST() {
    return this.configService.get<string>('REDIS_HOST')!;
  }

  get REDIS_PORT() {
    return this.configService.get<number>('REDIS_PORT')!;
  }
}
