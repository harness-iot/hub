import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HARRIOT_DB } from '@harriot-core/database/database.constants';
import { HarriotDatabaseModule } from '@harriot-core/database/database.module';

import { HarriotHubEntity } from './hub.entity';
import { HarriotHubService } from './hub.service';

@Module({
  imports: [
    HarriotDatabaseModule,
    TypeOrmModule.forFeature([HarriotHubEntity], HARRIOT_DB),
  ],
  providers: [HarriotHubService],
  exports: [HarriotHubService],
})
export class HarriotHubModule {}
