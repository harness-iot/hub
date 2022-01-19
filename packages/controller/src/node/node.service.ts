import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { CLIENT_PROVIDER } from '@harriot-controller/client/client.constants';
import { NodeEntityService, RedisService } from '@harriot-hub/common';

interface ChannelOperationalSetting {
  [channel: number]: { [key: string]: string };
}

interface NodeOperationalSetting {
  node: { [key: string]: string };
  channels: ChannelOperationalSetting;
}

@Injectable()
export class NodeService {
  logger = new Logger(NodeService.name);

  constructor(
    @Inject(CLIENT_PROVIDER) private readonly client: ClientProxy,
    protected readonly nodeService: NodeEntityService,
    protected readonly redisService: RedisService,
  ) {}

  public async onPing(secret: string): Promise<void> {
    // Keep hydrating redis on ping
    await this.redisService.setConnectedNode(secret);
  }

  public async onOnline(node_id: string) {
    const node = await this.nodeService.findOne({
      where: { id: node_id },
      relations: ['channels'],
    });

    if (!node) {
      this.logger.error(`Failed to find node with id: ${node_id}`);
      return;
    }

    const nodeSettings = node.settings.reduce(
      (acc: { [key: string]: string }, setting) => ({
        [setting.key]: setting.value,
        ...acc,
      }),
      {},
    );

    const channelSettings = node.channels.reduce(
      (acc: ChannelOperationalSetting, channel) => ({
        [channel.channel]: channel.settings.reduce(
          (acc2: { [key: string]: string }, setting) => ({
            [setting.key]: setting.value,
            ...acc2,
          }),
          {},
        ),
        ...acc,
      }),
      {},
    );

    const settings: NodeOperationalSetting = {
      node: nodeSettings,
      channels: channelSettings,
    };

    this.client.send(`node/${node_id}`, { settings }).subscribe((value) => {
      if (value === 'received') {
        this.logger.log(`settings successfully set for node: ${node_id}`);
      }
    });

    await this.redisService.setConnectedNode(node_id);
  }

  public async onOffline(node_id: string): Promise<void> {
    this.logger.log(`NODE OFFLINE (last will): ${node_id}`);

    // Delete any active keys for this node
    const activeKeys = await this.redisService.getActiveNodeKeys(node_id);
    if (activeKeys.length > 0) {
      await this.redisService.deleteKeys(activeKeys);
    }
  }
}
