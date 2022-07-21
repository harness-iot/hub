import { Module } from '@nestjs/common';

import { SqliteModule } from '@harriot-db/sqlite/sqlite.module';

import { AuthRouteModule } from './auth/auth.module';
import { HubRouteModule } from './modules/hub/hub.module';
import { NodeInputRouteModule } from './modules/input/input.module';
import { NodeChannelRouteModule } from './modules/node-channel/node-channel.module';
import { NodeMeasurementRouteModule } from './modules/node-measurement/node-measurement.module';
import { NodeRouteModule } from './modules/node/node.module';
import { NodeOutputRouteModule } from './modules/output/output.module';

@Module({
  imports: [
    SqliteModule,
    AuthRouteModule,
    HubRouteModule,
    NodeRouteModule,
    NodeChannelRouteModule,
    NodeInputRouteModule,
    NodeMeasurementRouteModule,
    NodeOutputRouteModule,
  ],
})
export class RoutesModule {}
