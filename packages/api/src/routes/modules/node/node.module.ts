import { Module } from '@nestjs/common';

import { NodeEntityModule, RedisModule } from '@harriot-hub/common';
import { MqttModule } from '@harriot-mqtt/mqtt.module';

import { NodeRouteResolver } from './node.resolver';
import { NodeRouteService } from './node.service';

@Module({
  imports: [NodeEntityModule, RedisModule, MqttModule],
  providers: [NodeRouteService, NodeRouteResolver],
})
export class NodeRouteModule {}
