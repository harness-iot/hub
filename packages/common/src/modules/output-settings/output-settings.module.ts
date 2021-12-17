import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NodeOutputSettingsEntity } from '../../entities';

import { NodeOutputSettingsEntityService } from './output-settings.service';

@Module({
  imports: [TypeOrmModule.forFeature([NodeOutputSettingsEntity])],
  providers: [NodeOutputSettingsEntityService],
  exports: [NodeOutputSettingsEntityService],
})
export class NodeOutputSettingsEntityModule {}
