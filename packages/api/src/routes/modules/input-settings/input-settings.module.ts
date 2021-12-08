import { Module } from '@nestjs/common';

import { NodeInputSettingsModule } from '@harriot-hub/common';

import { NodeInputSettingsRouteResolver } from './input-settings.resolver';
import { NodeInputSettingsRouteService } from './input-settings.service';

@Module({
  imports: [NodeInputSettingsModule],
  providers: [NodeInputSettingsRouteService, NodeInputSettingsRouteResolver],
})
export class NodeInputSettingsRouteModule {}
