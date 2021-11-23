import { Injectable } from '@nestjs/common';

import { HarriotConfigService } from '@harriot-core/modules/config/config.service';
import { fetch as nodeFetch } from '@harriot-utils/fetch.util';

interface FetchOptions {
  endpoint: string;
  method: 'POST' | 'GET';
  body?: string;
}

@Injectable()
export class MycodoApiService {
  constructor(private readonly configService: HarriotConfigService) {}

  public async fetch<T>(opts: FetchOptions): Promise<T> {
    const apiKey = await this.configService.findOne({
      where: { name: 'mycodo_api_key' },
    });

    if (!apiKey) {
      throw Error('mycodo_api_key not found in config table');
    }

    return nodeFetch<T>(`http://localhost:5000/api/${opts.endpoint}`, {
      method: opts.method,
      body: opts.body,
      headers: {
        Accept: 'application/vnd.mycodo.v1+json',
        Authorization: `Basic ${apiKey.value}`,
        'Content-Type': 'application/json',
      },
    });
  }
}
