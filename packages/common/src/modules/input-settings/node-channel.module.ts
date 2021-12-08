import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NodeInputSettingsEntity } from '../../entities';

import { NodeInputSettingsEntityService } from './node-channel.service';

@Module({
  imports: [TypeOrmModule.forFeature([NodeInputSettingsEntity])],
  providers: [NodeInputSettingsEntityService],
  exports: [NodeInputSettingsEntityService],
})
export class NodeInputSettingsEntityModule {}
