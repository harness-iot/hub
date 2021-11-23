import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { ConfigService } from '@harriot-config/config.service';

@Injectable()
export class HarriotDatabaseService implements TypeOrmOptionsFactory {
  constructor(readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'sqlite',
      database: this.configService.DB_PATH,
      entities: [`${__dirname}/../modules/**/*.entity{.ts,.js}`],
      synchronize: this.configService.isDev,
      dropSchema: false,
    };
  }
}
