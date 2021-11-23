import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MYCODO_DB } from '@harriot-mycodo/database/database.constants';
import { MycodoDatabaseModule } from '@harriot-mycodo/database/database.module';

import { MycodoConversionEntity } from './conversion.entity';
import { MycodoConversionService } from './conversion.service';

@Module({
  imports: [
    MycodoDatabaseModule,
    TypeOrmModule.forFeature([MycodoConversionEntity], MYCODO_DB),
  ],
  providers: [MycodoConversionService],
  exports: [MycodoConversionService],
})
export class MycodoConversionModule {}
