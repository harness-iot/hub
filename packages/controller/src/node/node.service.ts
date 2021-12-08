import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { CLIENT_PROVIDER } from '@harriot-controller/client/client.constants';
import {
  NodeEntityService,
  NodeInputSettingsEntity,
  NodeInputSettingsEntityService,
  NodeTypeEnum,
  RedisCache,
} from '@harriot-hub/common';

import { NodeOnlinePayload } from './node.interface';

@Injectable()
export class NodeService {
  logger = new Logger(NodeService.name);

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: RedisCache,
    @Inject(CLIENT_PROVIDER) private readonly client: ClientProxy,
    protected readonly nodeService: NodeEntityService,
    protected readonly inputSettingsService: NodeInputSettingsEntityService,
  ) {}

  public async onPing(secret: string): Promise<void> {
    await this.cacheManager.set(`node:${secret}`, '', { ttl: 12 });
  }

  private async getSettings(
    type: NodeTypeEnum,
    node_id: string,
  ): Promise<NodeInputSettingsEntity> {
    if (type === NodeTypeEnum.INPUT) {
      return this.inputSettingsService.findOne({ where: { node_id } });
    }

    throw Error(`Failed to getting node settings for type: ${type}`);
  }

  public async onOnline(secret: string, settings: NodeOnlinePayload) {
    const node = await this.nodeService.findOne({ where: { id: secret } });

    if (!node) {
      this.logger.error(`Failed to find node with id: ${secret}`);
      return;
    }

    if (node.type === NodeTypeEnum.INPUT) {
      const inputSettings = await this.inputSettingsService.findOne({
        where: { node_id: node.id },
      });

      if (!inputSettings) {
        this.logger.error(
          `Failed to find input settings with node_id: ${secret}`,
        );
        return;
      }

      const baseSettings = Object.keys(inputSettings).reduce(
        (acc: any, prop: string) =>
          settings.base.includes(prop)
            ? { [prop]: inputSettings[prop], ...acc }
            : acc,
        {},
      );

      const inputSetSettings = {
        settings: {
          base: baseSettings,
        },
      };

      this.client
        .send(`node/${secret}`, inputSetSettings)
        .subscribe((value) => {
          if (value === 'received') {
            this.logger.log(`settings successfully set for node: ${secret}`);
          }
        });
    }

    await this.cacheManager.set(`node:${secret}`, '', { ttl: 12 });
    // to do: step 1 - query node 'run settings' and publish to node

    // Step 2. get activated conditionals from cache
    const conditionalsStr = await this.cacheManager.get<string>('conditionals');
    const conditionals = JSON.parse(conditionalsStr);

    console.log('CONDITIONALS FROM CASH: ', conditionals);
  }

  public onOffline(secret: string): void {
    this.logger.log(`NODE OFFLINE (last will): ${secret}`);
  }
}
