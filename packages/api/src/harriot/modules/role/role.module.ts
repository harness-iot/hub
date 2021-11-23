import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HARRIOT_DB } from '@harriot-core/database/database.constants';
import { HarriotDatabaseModule } from '@harriot-core/database/database.module';

import { HarriotRoleEntity } from './role.entity';
import { HarriotRoleService } from './role.service';

@Module({
  imports: [
    HarriotDatabaseModule,
    TypeOrmModule.forFeature([HarriotRoleEntity], HARRIOT_DB),
  ],
  providers: [HarriotRoleService],
  exports: [HarriotRoleService],
})
export class HarriotRoleModule {}
