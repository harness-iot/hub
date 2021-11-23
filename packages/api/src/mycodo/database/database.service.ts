import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { ConfigService } from '@harriot-config/config.service';

@Injectable()
export class MycodoDatabaseService implements TypeOrmOptionsFactory {
  constructor(readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'sqlite',
      database: this.configService.MYCODO_DB_PATH,
      entities: [`${__dirname}/../modules/**/*.entity{.ts,.js}`],
      dropSchema: false,
      synchronize: false,
      logging: true,
    };
  }
}
