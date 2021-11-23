import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MYCODO_DB } from './database.constants';
import { MycodoDatabaseService } from './database.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: MYCODO_DB,
      useClass: MycodoDatabaseService,
    }),
  ],
})
export class MycodoDatabaseModule {}
