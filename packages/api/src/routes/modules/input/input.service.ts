import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import {
  NodeEntity,
  NodeEntityService,
  RedisService,
} from '@harriot-hub/common';
import { MQTT_PROVIDER } from '@harriot-mqtt/mqtt.constants';

import { NodeInputActiveStatusEnum } from './input.enum';

@Injectable()
export class NodeInputRouteService {
  constructor(
    @Inject(MQTT_PROVIDER) private readonly client: ClientProxy,
    protected readonly nodeService: NodeEntityService,
    protected readonly redisService: RedisService,
  ) {}

  public async activate(
    node_id: string,
    status: NodeInputActiveStatusEnum,
  ): Promise<boolean> {
    const cached_node = await this.redisService.getEntity<NodeEntity>(
      'node',
      node_id,
    );

    if (!cached_node) {
      throw Error(`Failed to find cached node: ${node_id}`);
    }

    if (status === NodeInputActiveStatusEnum.DEACTIVATE) {
      const payload = {
        action: {
          type: 'deactivate',
        },
      };

      this.client.send(`node/${node_id}`, payload).subscribe(async (value) => {
        if (value === 'success') {
          await this.redisService.deleteActiveNode(node_id);
        }
      });
      return true;
    }

    const enabledMeasurements = cached_node.channels.reduce(
      (acc, ch) => (ch.is_enabled ? [ch.channel, ...acc] : acc),
      [],
    );

    const payload = {
      action: {
        type: 'activate',
        channels: enabledMeasurements,
      },
    };

    this.client.send(`node/${node_id}`, payload).subscribe(async (value) => {
      if (value === 'success') {
        await this.redisService.setActiveNode(node_id, 'manual');
      }
    });

    return true;
  }
}
