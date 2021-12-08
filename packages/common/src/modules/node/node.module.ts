import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NodeEntity } from '../../entities';

import { NodeService } from './node.service';

@Module({
  imports: [TypeOrmModule.forFeature([NodeEntity])],
  providers: [NodeService],
  exports: [NodeService],
})
export class NodeModule {}
