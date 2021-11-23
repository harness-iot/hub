import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CrudService } from '@harriot-core/database/crud.service';
import { HARRIOT_DB } from '@harriot-core/database/database.constants';

import { HarriotConfigEntity } from './config.entity';

@Injectable()
export class HarriotConfigService extends CrudService<HarriotConfigEntity> {
  constructor(
    @InjectRepository(HarriotConfigEntity, HARRIOT_DB)
    protected readonly repository: Repository<HarriotConfigEntity>,
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

    const config = new HarriotConfigEntity();
    config.name = 'network_type';
    config.value = type;
    await this.repository.save(config);
  }

  public async setInstanceSecret(secret: string): Promise<void> {
    const config = new HarriotConfigEntity();
    config.name = 'instance_secret';
    config.value = secret;
    await this.repository.save(config);
  }

  public async setInstanceMycodoApiKey(api_key: string): Promise<void> {
    const config = new HarriotConfigEntity();
    config.name = 'mycodo_api_key';
    config.value = api_key;
    await this.repository.save(config);
  }
}
