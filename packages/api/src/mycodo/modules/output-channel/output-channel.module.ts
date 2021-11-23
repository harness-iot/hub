import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MYCODO_DB } from '@harriot-mycodo/database/database.constants';
import { MycodoDatabaseModule } from '@harriot-mycodo/database/database.module';

import { MycodoOutputChannelEntity } from './output-channel.entity';
import { MycodoOutputChannelService } from './output-channel.service';

@Module({
  imports: [
    MycodoDatabaseModule,
    TypeOrmModule.forFeature([MycodoOutputChannelEntity], MYCODO_DB),
  ],
  providers: [MycodoOutputChannelService],
  exports: [MycodoOutputChannelService],
})
export class MycodoOutputChannelModule {}
