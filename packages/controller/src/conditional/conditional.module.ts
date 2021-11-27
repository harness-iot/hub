import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from '@harriot-controller/database/database.module';
import { ConditionalEntity } from '@harriot-hub/common';

import { ConditionalService } from './conditional.service';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([ConditionalEntity])],
  providers: [ConditionalService],
  exports: [ConditionalService],
})
export class ConditionalModule {}
