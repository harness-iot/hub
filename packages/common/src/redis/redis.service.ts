import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

import { NodeStatusDto } from '../dto';
import { BaseEntity, NodeChannelEntity } from '../entities';

@Injectable()
export class RedisService {
  constructor(@InjectRedis('default') private readonly client: Redis) {}

  public async setActiveInputNode<T extends BaseEntity[]>(
    id: string,
    channels: T,
    expiry?: number,
  ): Promise<void> {
    if (expiry) {
      await this.client.set(
        `active:node:${id}`,
        JSON.stringify(channels),
        'EX',
        expiry,
      );
      return;
    }

    await this.client.set(`active:node:${id}`, JSON.stringify(channels));
  }

  public async getActiveInputNode<T extends BaseEntity[]>(
    id: string,
  ): Promise<T | null> {
    const node_str = await this.client.get(`active:node:${id}`);

    if (!node_str) {
      return null;
    }

    return JSON.parse(node_str) as T;
  }

  public async deleteActiveInputNode(id: string): Promise<void> {
    await this.client.del(`active:node:${id}`);
  }

  public async setActiveOutputNode(
    id: string,
    channel: NodeChannelEntity,
    expiry?: number,
  ): Promise<void> {
    if (expiry) {
      await this.client.set(
        `active:node:${id}:${channel.channel}`,
        JSON.stringify(channel),
        'EX',
        expiry,
      );
      return;
    }

    await this.client.set(
      `active:node:${id}:${channel.channel}`,
      JSON.stringify(channel),
    );
  }

  public async getActiveOutputNode(
    id: string,
    channel: number,
  ): Promise<NodeChannelEntity | null> {
    const node_str = await this.client.get(`active:node:${id}:${channel}`);

    if (!node_str) {
      return null;
    }

    return JSON.parse(node_str) as NodeChannelEntity;
  }

  public async deleteActiveOutputNode(
    id: string,
    channel: number,
  ): Promise<void> {
    await this.client.del(`active:node:${id}:${channel}`);
  }

  public async setConnectedNode(id: string): Promise<void> {
    await this.client.set(`connected:node:${id}`, '', 'EX', 12);
  }

  public async getIsNodeConnected(id: string): Promise<number> {
    return this.client.exists(`connected:node:${id}`);
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
}
