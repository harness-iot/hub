import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

import { NodeStatusDto } from '../dto';
import { BaseEntity } from '../entities/base';

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

  public async getNodesStatus(): Promise<NodeStatusDto> {
    return new Promise((resolve, reject) => {
      const results = [];

      const stream = this.client.scanStream();
      stream.on('data', (keys: string[]) => {
        const result = keys.filter(
          (key) =>
            key.startsWith('connected:node:') || key.startsWith('active:node:'),
        );

        results.push(...result);
      });
      stream.on('end', () => {
        const formattedResults = results.reduce(
          (acc: NodeStatusDto, key: string) => {
            const [type, , nodeId] = key.split(':');

            if (type === 'connected') {
              return {
                connected: [nodeId, ...acc.connected],
                active: acc.active,
              };
            }

            if (type === 'active') {
              return {
                active: [nodeId, ...acc.active],
                connected: acc.connected,
              };
            }
          },
          { active: [], connected: [] },
        );

        resolve(formattedResults);
      });
      stream.on('error', (err) => reject(err));
    });
  }
}
