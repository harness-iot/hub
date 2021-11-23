import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MYCODO_DB } from '@harriot-mycodo/database/database.constants';
import { MycodoDatabaseModule } from '@harriot-mycodo/database/database.module';

import { MycodoRoleEntity } from './role.entity';
import { MycodoRoleService } from './role.service';

@Module({
  imports: [
    MycodoDatabaseModule,
    TypeOrmModule.forFeature([MycodoRoleEntity], MYCODO_DB),
  ],
  providers: [MycodoRoleService],
  exports: [MycodoRoleService],
})
export class MycodoRoleModule {}
