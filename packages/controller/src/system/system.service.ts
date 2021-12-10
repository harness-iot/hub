import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy, MqttContext } from '@nestjs/microservices';

import { CLIENT_PROVIDER } from '@harriot-controller/client/client.constants';
import { NodeEntityService, RedisCache } from '@harriot-hub/common';

@Injectable()
export class SystemService {
  logger = new Logger(SystemService.name);

  constructor(
    @Inject(CLIENT_PROVIDER) private client: ClientProxy,
    @Inject(CACHE_MANAGER) private cacheManager: RedisCache,
    protected readonly nodeService: NodeEntityService,
  ) {}

  public async bootstrap(): Promise<void> {
    const nodes = await this.nodeService.find({ relations: ['channels'] });

    await Promise.all(
      nodes.map(async (node) => {
        await this.cacheManager.set(
          `node_entity:${node.id}`,
          JSON.stringify(node),
        );
      }),
    );
  }

  public online(context: MqttContext): Promise<void> {
    this.logger.log('CONTROLLER ONLINE');

    this.client.emit('alive_check', {});
    return;
  }
}
