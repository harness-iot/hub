import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NodeEntity } from '../../entities';

import { NodeEntityService } from './node.service';

@Module({
  imports: [TypeOrmModule.forFeature([NodeEntity])],
  providers: [NodeEntityService],
  exports: [NodeEntityService],
})
export class NodeEntityModule {}
