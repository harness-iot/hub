import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MYCODO_DB } from '@harriot-mycodo/database/database.constants';
import { MycodoDatabaseModule } from '@harriot-mycodo/database/database.module';

import { MycodoDisplayOrderEntity } from './display-order.entity';
import { MycodoDisplayOrderService } from './display-order.service';

@Module({
  imports: [
    MycodoDatabaseModule,
    TypeOrmModule.forFeature([MycodoDisplayOrderEntity], MYCODO_DB),
  ],
  providers: [MycodoDisplayOrderService],
  exports: [MycodoDisplayOrderService],
})
export class MycodoDisplayOrderModule {}
