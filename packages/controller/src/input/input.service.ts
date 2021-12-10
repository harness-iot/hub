import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';

import { InfluxService, NodeEntity, RedisCache } from '@harriot-hub/common';

interface Payload {
  channel: number;
  value: string;
}

@Injectable()
export class InputService {
  logger = new Logger('InputService');

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: RedisCache,
    protected readonly influxService: InfluxService,
  ) {}

  async activity(secret: string, payload: Payload): Promise<void> {
    try {
      const cached_node_str = await this.cacheManager.get<string>(
        `node_active:${secret}`,
      );

      if (!cached_node_str) {
        throw Error(`Failed to find cached node: ${secret}`);
      }

      const cached_node: NodeEntity = JSON.parse(cached_node_str);

      const channel = cached_node.channels.find(
        (ch) => ch.channel === payload.channel,
      );

      if (!channel) {
        throw Error(
          `Failed to find channel ${payload.channel} on node ${secret}`,
        );
      }

      await this.influxService.write([
        {
          measurement: channel.default_measurement_unit,
          tags: {
            node_id: channel.node_id,
            channel: channel.channel.toString(),
            measurement: channel.measurement_key,
          },
          fields: {
            value: payload.value,
          },
        },
      ]);
    } catch (error) {
      this.logger.error('[InputService:activity]', error);
    }
  }
}
