import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NodeChannelEntity } from '../../entities';

import { NodeChannelService } from './node-channel.service';

@Module({
  imports: [TypeOrmModule.forFeature([NodeChannelEntity])],
  providers: [NodeChannelService],
  exports: [NodeChannelService],
})
export class NodeChannelModule {}
