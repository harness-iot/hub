import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HARRIOT_DB } from '@harriot-core/database/database.constants';
import { HarriotDatabaseModule } from '@harriot-core/database/database.module';
import { ConfigEntity } from '@harriot-hub/common';

import { HarriotConfigService } from './config.service';

@Module({
  imports: [
    HarriotDatabaseModule,
    TypeOrmModule.forFeature([ConfigEntity], HARRIOT_DB),
  ],
  providers: [HarriotConfigService],
  exports: [HarriotConfigService],
})
export class HarriotConfigModule {}
