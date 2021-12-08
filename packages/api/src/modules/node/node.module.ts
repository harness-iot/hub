import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SqliteModule } from '@harriot-db/sqlite/sqlite.module';
import { NodeEntity } from '@harriot-hub/common';

import { NodeService } from './node.service';

@Module({
  imports: [SqliteModule, TypeOrmModule.forFeature([NodeEntity])],
  providers: [NodeService],
  exports: [NodeService],
})
export class NodeModule {}
