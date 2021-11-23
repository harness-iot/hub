import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HARRIOT_DB } from './database.constants';
import { HarriotDatabaseService } from './database.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: HARRIOT_DB,
      useClass: HarriotDatabaseService,
    }),
  ],
})
export class HarriotDatabaseModule {}
