import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SqliteService } from './sqlite.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: SqliteService,
    }),
  ],
})
export class SqliteModule {}
