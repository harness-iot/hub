import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HARRIOT_DB } from '@harriot-core/database/database.constants';
import { HarriotDatabaseModule } from '@harriot-core/database/database.module';
import {
  ConditionalActionEntity,
  ConditionalEntity,
} from '@harriot-hub/common';

import { ApiConditionalResolver } from './conditional.resolver';
import { ApiConditionalService } from './conditional.service';

@Module({
  imports: [
    HarriotDatabaseModule,
    TypeOrmModule.forFeature(
      [ConditionalEntity, ConditionalActionEntity],
      HARRIOT_DB,
    ),
  ],
  providers: [ApiConditionalService, ApiConditionalResolver],
})
export class ApiConditionalModule {}
