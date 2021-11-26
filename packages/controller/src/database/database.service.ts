import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { ConfigService } from '@harriot-controller/config/config.service';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  constructor(readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'sqlite',
      database: this.configService.DB_PATH,
      entities: [
        `${this.configService.HARRIOT_PATH}/packages/common/dist/entities/*{.ts,.js}`,
      ],
      synchronize: this.configService.ENV_IS_DEVELOPMENT,
      dropSchema: false,
    };
  }
}
