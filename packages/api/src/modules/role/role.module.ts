import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SqliteModule } from '@harriot-db/sqlite/sqlite.module';
import { RoleEntity } from '@harriot-hub/common';

import { RoleService } from './role.service';

@Module({
  imports: [SqliteModule, TypeOrmModule.forFeature([RoleEntity])],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
