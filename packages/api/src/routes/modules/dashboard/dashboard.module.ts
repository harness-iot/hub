import { Module } from '@nestjs/common';

import { DashboardCardEntityModule } from '@harriot-hub/common';

import { DashboardRouteResolver } from './dashboard.resolver';
import { DashboardRouteService } from './dashboard.service';

@Module({
  imports: [DashboardCardEntityModule],
  providers: [DashboardRouteService, DashboardRouteResolver],
})
export class DashboardRouteModule {}
