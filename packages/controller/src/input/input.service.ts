import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { CLIENT_PROVIDER } from '@harriot-controller/client/client.constants';
import {
  InfluxService,
  NodeChannelEntity,
  RedisService,
} from '@harriot-hub/common';

interface Payload {
  channel: number;
  value: string;
}

@Injectable()
export class InputService {
  logger = new Logger('InputService');

  constructor(
    @Inject(CLIENT_PROVIDER) private readonly client: ClientProxy,
    protected readonly influxService: InfluxService,
    protected readonly redisService: RedisService,
  ) {}

  async activity(secret: string, payload: Payload): Promise<void> {
    try {
      const cached_channels = await this.redisService.getActiveInputNode<
        NodeChannelEntity[]
      >(secret);

      if (!cached_channels) {
        // This can happen if node has been activated but hub restarts
        this.logger.warn(
          `Failed to find cached channels with node id: ${secret}. Deactivating...`,
        );

        this.client
          .send(`node/${secret}`, {
            action: {
              type: 'deactivate',
            },
          })
          .subscribe((value) => {
            if (value === 'success') {
              this.logger.log(`Node (${secret}) successfully deactivated`);
            }
          });

        return;
      }

      const channel = cached_channels.find(
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
