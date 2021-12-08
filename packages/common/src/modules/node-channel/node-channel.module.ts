import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NodeChannelEntity } from '../../entities';

import { NodeChannelEntityService } from './node-channel.service';

@Module({
  imports: [TypeOrmModule.forFeature([NodeChannelEntity])],
  providers: [NodeChannelEntityService],
  exports: [NodeChannelEntityService],
})
export class NodeChannelEntityModule {}
