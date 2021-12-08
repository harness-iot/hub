import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SqliteModule } from '@harriot-db/sqlite/sqlite.module';
import { NodeChannelEntity } from '@harriot-hub/common';

import { NodeChannelService } from './node-channel.service';

@Module({
  imports: [SqliteModule, TypeOrmModule.forFeature([NodeChannelEntity])],
  providers: [NodeChannelService],
  exports: [NodeChannelService],
})
export class NodeChannelModule {}
