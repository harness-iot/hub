import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

import { NodeStatusDto } from '../dto';
import { BaseEntity, NodeChannelEntity } from '../entities';

@Injectable()
export class RedisService {
  constructor(@InjectRedis('default') private readonly client: Redis) {}

  public async setEntity<T extends BaseEntity>(
    type: 'node',
    entity: T,
  ): Promise<void> {
    await this.client.set(
      `entity:${type}:${entity.id}`,
      JSON.stringify(entity),
    );
  }

  public async getEntity<T extends BaseEntity>(
    type: 'node',
    entityId: string,
  ): Promise<T | null> {
    const entity_str = await this.client.get(`entity:${type}:${entityId}`);

    if (!entity_str) {
      return null;
    }

    return JSON.parse(entity_str) as T;
  }

  public async setActiveNode(id: string, payload: 'manual'): Promise<void> {
    await this.client.set(`active:node:${id}`, payload);
  }

  public async deleteActiveNode(id: string): Promise<void> {
    await this.client.del(`active:node:${id}`);
  }

  public async setConnectedNode(id: string): Promise<void> {
    await this.client.set(`connected:node:${id}`, '', 'EX', 12);
  }

  public async getNodesStatus(): Promise<NodeStatusDto[]> {
    return new Promise((resolve, reject) => {
      const data: string[] = [];

      const stream = this.client.scanStream();
      stream.on('data', (keys: string[]) => {
        const key = keys.filter(
          (k) =>
            k.startsWith('connected:node:') || k.startsWith('active:node:'),
        );

        data.push(...key);
      });
      stream.on('end', () => {
        const result = data.reduce((acc: NodeStatusDto[], key: string) => {
          const [type, , nodeId] = key.split(':');

          const nodeIndex = acc.findIndex(({ node_id }) => node_id === nodeId);

          if (nodeIndex > -1) {
            acc[nodeIndex] = { ...acc[nodeIndex], [type]: true };
            return acc;
          }

          return [
            {
              node_id: nodeId,
              connected: type === 'connected' ? true : false,
              active: type === 'active' ? true : false,
            },
            ...acc,
          ];
        }, []);

        resolve(result);
      });
      stream.on('error', (err) => reject(err));
    });
  }

  public async setNodeChannelsForMeasurements(
    node_id: string,
    channels: NodeChannelEntity[],
    expire: number,
  ): Promise<void> {
    await this.client.set(
      `node_channels_measurements:${node_id}`,
      JSON.stringify(channels),
      'EX',
      expire,
    );
  }

  public async getNodeChannelsForMeasurements(
    node_id: string,
  ): Promise<NodeChannelEntity[] | null> {
    const cached_channels = await this.client.get(
      `node_channels_measurements:${node_id}`,
    );

    if (!cached_channels) {
      return null;
    }

    return JSON.parse(cached_channels) as NodeChannelEntity[];
  }
}
