import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';

import { NodeEntity } from '@harriot-hub/common';

@Injectable()
export class NodeService {
  logger = new Logger(NodeService.name);

  constructor(
    @InjectRepository(NodeEntity)
    protected readonly repository: Repository<NodeEntity>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  public async onPing(secret: string): Promise<void> {
    await this.cacheManager.set(`node:${secret}`, '', { ttl: 12 });
  }

  public async onOnline(secret: string) {
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
