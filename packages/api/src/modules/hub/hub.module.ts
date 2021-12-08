import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SqliteModule } from '@harriot-db/sqlite/sqlite.module';
import { ConfigEntity } from '@harriot-hub/common';

import { HubService } from './hub.service';

@Module({
  imports: [SqliteModule, TypeOrmModule.forFeature([ConfigEntity])],
  providers: [HubService],
  exports: [HubService],
})
export class HubModule {}
