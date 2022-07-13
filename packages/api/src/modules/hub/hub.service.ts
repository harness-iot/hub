import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SqliteCrudService } from '@harriot-db/sqlite/sqlite-crud.service';
import { ConfigEntity } from '@harriot-hub/common';

@Injectable()
export class HubService extends SqliteCrudService<ConfigEntity> {
  constructor(
    @InjectRepository(ConfigEntity)
    protected readonly repository: Repository<ConfigEntity>,
  ) {
    super();
  }

  public async getNetworkType(): Promise<string | undefined> {
    const network = await this.repository.findOne({
      where: { name: 'network_type' },
    });

    return network ? network.value : undefined;
  }

  public async setNetworkType(type: 'WIFI' | 'HUBFI'): Promise<void> {
    if (type !== 'WIFI' && type !== 'HUBFI') {
      throw Error(`invalid network type: ${type}`);
    }

    const config = new ConfigEntity();
    config.name = 'network_type';
    config.value = type;
    await this.repository.save(config);
  }

  public async resetInstanceSecret(): Promise<void> {
    const existing_secret = await this.repository.findOne({
      where: { name: 'instance_secret' },
    });

    if (existing_secret) {
      await this.repository.remove(existing_secret);
    }
  }

  public async setInstanceSecret(secret: string): Promise<void> {
    const config = new ConfigEntity();
    config.name = 'instance_secret';
    config.value = secret;
    await this.repository.save(config);
  }
}
