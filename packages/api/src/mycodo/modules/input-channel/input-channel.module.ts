import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MYCODO_DB } from '@harriot-mycodo/database/database.constants';
import { MycodoDatabaseModule } from '@harriot-mycodo/database/database.module';

import { MycodoInputChannelEntity } from './input-channel.entity';
import { MycodoInputChannelService } from './input-channel.service';

@Module({
  imports: [
    MycodoDatabaseModule,
    TypeOrmModule.forFeature([MycodoInputChannelEntity], MYCODO_DB),
  ],
  providers: [MycodoInputChannelService],
  exports: [MycodoInputChannelService],
})
export class MycodoInputChannelModule {}
