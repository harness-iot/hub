import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from '@harriot-controller/database/database.module';
import { NodeEntity } from '@harriot-hub/common';

import { NodeController } from './node.controller';
import { NodeService } from './node.service';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([NodeEntity])],
  controllers: [NodeController],
  providers: [NodeService],
  exports: [NodeService],
})
export class NodeModule {}
