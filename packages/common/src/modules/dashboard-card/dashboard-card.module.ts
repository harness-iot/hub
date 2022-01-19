import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DashboardCardEntity } from '../../entities';

import { DashboardCardEntityService } from './dashboard-card.service';

@Module({
  imports: [TypeOrmModule.forFeature([DashboardCardEntity])],
  providers: [DashboardCardEntityService],
  exports: [DashboardCardEntityService],
})
export class DashboardCardEntityModule {}
