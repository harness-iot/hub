import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { ConfigService } from '@harriot-config/config.service';

@Injectable()
export class SqliteService implements TypeOrmOptionsFactory {
  constructor(readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'sqlite',
      database: `${this.configService.BASE_DIR}/../db/${this.configService.DB_NAME}`,
      entities: [
        `${this.configService.BASE_DIR}/packages/common/dist/entities/*{.ts,.js}`,
      ],
      // synchronize: this.configService.NODE_ENV === 'development',
      dropSchema: false,
    };
  }
}
