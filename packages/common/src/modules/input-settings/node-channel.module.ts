import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NodeInputSettingsEntity } from '../../entities';

import { NodeInputSettingsService } from './node-channel.service';

@Module({
  imports: [TypeOrmModule.forFeature([NodeInputSettingsEntity])],
  providers: [NodeInputSettingsService],
  exports: [NodeInputSettingsService],
})
export class NodeInputSettingsModule {}
