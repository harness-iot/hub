import { Module } from '@nestjs/common';

import { NodeInputSettingsEntityModule } from '@harriot-hub/common';

import { NodeInputSettingsRouteResolver } from './input-settings.resolver';
import { NodeInputSettingsRouteService } from './input-settings.service';

@Module({
  imports: [NodeInputSettingsEntityModule],
  providers: [NodeInputSettingsRouteService, NodeInputSettingsRouteResolver],
})
export class NodeInputSettingsRouteModule {}
