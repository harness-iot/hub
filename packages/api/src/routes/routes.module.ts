import { Module } from '@nestjs/common';

import { SqliteModule } from '@harriot-db/sqlite/sqlite.module';

import { AuthRouteModule } from './auth/auth.module';
import { HubRouteModule } from './modules/hub/hub.module';
import { NodeInputSettingsRouteModule } from './modules/input-settings/input-settings.module';
import { NodeChannelRouteModule } from './modules/node-channel/node-channel.module';
import { NodeRouteModule } from './modules/node/node.module';

@Module({
  imports: [
    SqliteModule,
    AuthRouteModule,
    HubRouteModule,
    NodeRouteModule,
    NodeChannelRouteModule,
    NodeInputSettingsRouteModule,
  ],
})
export class RoutesModule {}
