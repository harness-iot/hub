import { Module } from '@nestjs/common';

import { NodeEntityModule, RedisModule } from '@harriot-hub/common';
import { MqttModule } from '@harriot-mqtt/mqtt.module';

import { NodeInputRouteResolver } from './input.resolver';
import { NodeInputRouteService } from './input.service';

@Module({
  imports: [MqttModule, RedisModule, NodeEntityModule],
  providers: [NodeInputRouteService, NodeInputRouteResolver],
})
export class NodeInputRouteModule {}
