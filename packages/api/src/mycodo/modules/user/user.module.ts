import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MYCODO_DB } from '@harriot-mycodo/database/database.constants';
import { MycodoDatabaseModule } from '@harriot-mycodo/database/database.module';

import { MycodoUserEntity } from './user.entity';
import { MycodoUserService } from './user.service';

@Module({
  imports: [
    MycodoDatabaseModule,
    TypeOrmModule.forFeature([MycodoUserEntity], MYCODO_DB),
  ],
  providers: [MycodoUserService],
  exports: [MycodoUserService],
})
export class MycodoUserModule {}
