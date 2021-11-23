import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HARRIOT_DB } from '@harriot-core/database/database.constants';
import { HarriotDatabaseModule } from '@harriot-core/database/database.module';

import { HarriotConfigEntity } from './config.entity';
import { HarriotConfigService } from './config.service';

@Module({
  imports: [
    HarriotDatabaseModule,
    TypeOrmModule.forFeature([HarriotConfigEntity], HARRIOT_DB),
  ],
  providers: [HarriotConfigService],
  exports: [HarriotConfigService],
})
export class HarriotConfigModule {}
