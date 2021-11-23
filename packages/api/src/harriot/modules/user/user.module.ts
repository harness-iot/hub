import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HARRIOT_DB } from '@harriot-core/database/database.constants';
import { HarriotDatabaseModule } from '@harriot-core/database/database.module';

import { HarriotUserEntity } from './user.entity';
import { HarriotUserService } from './user.service';

@Module({
  imports: [
    HarriotDatabaseModule,
    TypeOrmModule.forFeature([HarriotUserEntity], HARRIOT_DB),
  ],
  providers: [HarriotUserService],
  exports: [HarriotUserService],
})
export class HarriotUserModule {}
