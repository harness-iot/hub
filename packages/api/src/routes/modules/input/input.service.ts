import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { NodeEntityService, RedisCache } from '@harriot-hub/common';
import { MQTT_PROVIDER } from '@harriot-mqtt/mqtt.constants';

import { NodeInputActiveStatusEnum } from './input.enum';

@Injectable()
export class NodeInputRouteService {
  constructor(
    @Inject(MQTT_PROVIDER) private readonly client: ClientProxy,
    @Inject(CACHE_MANAGER) private cacheManager: RedisCache,
    protected readonly nodeService: NodeEntityService,
  ) {}

  public async activate(
    node_id: string,
    status: NodeInputActiveStatusEnum,
  ): Promise<boolean> {
    const node = await this.nodeService.findOne({
      where: { id: node_id },
      relations: ['channels'],
    });

    if (!node) {
      throw Error(`failed to find node with id: ${node_id}`);
    }

    if (status === NodeInputActiveStatusEnum.DEACTIVATE) {
      const payload = {
        action: {
          type: 'deactivate',
        },
      };

      this.client.send(`node/${node_id}`, payload).subscribe(async (value) => {
        if (value === 'success') {
          await this.cacheManager.del(`manual:${node_id}`);
        }
      });
      return true;
    }

    const enabledMeasurements = node.channels.map((channel) =>
      channel.is_enabled ? 1 : 0,
    );

    const payload = {
      action: {
        type: 'activate',
        channels: enabledMeasurements,
      },
    };

    this.client.send(`node/${node_id}`, payload).subscribe(async (value) => {
      if (value === 'success') {
        await this.cacheManager.set(`manual:${node_id}`, '');
      }
    });

    return true;
  }
}
