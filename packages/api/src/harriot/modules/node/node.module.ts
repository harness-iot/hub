import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HARRIOT_DB } from '@harriot-core/database/database.constants';
import { HarriotDatabaseModule } from '@harriot-core/database/database.module';

import { HarriotNodeEntity } from './node.entity';
import { HarriotNodeService } from './node.service';

@Module({
  imports: [
    HarriotDatabaseModule,
    TypeOrmModule.forFeature([HarriotNodeEntity], HARRIOT_DB),
  ],
  providers: [HarriotNodeService],
  exports: [HarriotNodeService],
})
export class HarriotNodeModule {}
