import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { CLIENT_PROVIDER } from '@harriot-controller/client/client.constants';
import {
  NodeEntity,
  NodeEntityService,
  NodeInputSettingsEntity,
  NodeInputSettingsEntityService,
  NodeOutputSettingsEntity,
  NodeOutputSettingsEntityService,
  NodeTypeEnum,
  RedisService,
} from '@harriot-hub/common';

import { NodeOnlinePayload } from './node.interface';

interface NodeRunSettings {
  base: { [key: string]: string };
  custom?: { [key: string]: string };
}

interface OutputRunSettings extends NodeRunSettings {
  channel: number;
}

@Injectable()
export class NodeService {
  logger = new Logger(NodeService.name);

  constructor(
    @Inject(CLIENT_PROVIDER) private readonly client: ClientProxy,
    protected readonly nodeService: NodeEntityService,
    protected readonly inputSettingsService: NodeInputSettingsEntityService,
    protected readonly outputSettingsService: NodeOutputSettingsEntityService,
    protected readonly redisService: RedisService,
  ) {}

  public async onPing(secret: string): Promise<void> {
    // Keep hydrating redis on ping
    await this.redisService.setConnectedNode(secret);
  }

  private static populateInputRunSettings = (
    runSettings: NodeOnlinePayload,
    entitySettings: NodeInputSettingsEntity,
  ): NodeRunSettings =>
    Object.keys(entitySettings).reduce(
      (acc: NodeRunSettings, prop: string) => ({
        base: runSettings.base.includes(prop)
          ? { [prop]: entitySettings[prop], ...acc.base }
          : acc.base,
        custom: runSettings.custom.includes(prop)
          ? { [prop]: entitySettings[prop], ...acc.custom }
          : acc.custom,
      }),
      { base: {}, custom: {} },
    );

  private static populateOutputRunSettings = (
    runSettings: NodeOnlinePayload,
    entitySettings: NodeOutputSettingsEntity[],
  ): OutputRunSettings[] =>
    entitySettings.map((settings, index) =>
      Object.keys(settings).reduce(
        (acc: OutputRunSettings, prop: string) => ({
          channel: settings.channel,
          base: runSettings.base.includes(prop)
            ? { [prop]: entitySettings[index][prop], ...acc.base }
            : acc.base,
          custom: runSettings.custom.includes(prop)
            ? { [prop]: entitySettings[index][prop], ...acc.custom }
            : acc.custom,
        }),
        {
          channel: 0,
          base: {},
          custom: {},
        },
      ),
    );

  public async getRunSettings(
    node: NodeEntity,
    settings: NodeOnlinePayload,
  ): Promise<NodeRunSettings | NodeRunSettings[]> {
    // Handle input settings
    if (node.type === NodeTypeEnum.INPUT) {
      const inputSettings = await this.inputSettingsService.findOne({
        where: { node_id: node.id },
      });

      return NodeService.populateInputRunSettings(settings, inputSettings);
    }

    // Handle output settings
    const outputSettings = await this.outputSettingsService.find({
      where: { node_id: node.id },
    });

    return NodeService.populateOutputRunSettings(settings, outputSettings);
  }

  public async onOnline(node_id: string, settings: NodeOnlinePayload) {
    const node = await this.nodeService.findOne({ where: { id: node_id } });

    if (!node) {
      this.logger.error(`Failed to find node with id: ${node_id}`);
      return;
    }

    const runSettings = await this.getRunSettings(node, settings);

    this.client.send(`node/${node_id}`, runSettings).subscribe((value) => {
      if (value === 'received') {
        this.logger.log(`settings successfully set for node: ${node_id}`);
      }
    });

    await this.redisService.setConnectedNode(node_id);
  }

  public onOffline(node_id: string): void {
    this.logger.log(`NODE OFFLINE (last will): ${node_id}`);
  }
}
