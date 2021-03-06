import { Inject, Injectable } from '@nestjs/common';
import {
  InfluxDB,
  IPoint,
  IQueryOptions,
  IResults,
  ISingleHostConfig,
  IWriteOptions,
} from 'influx';

import { INFLUX_DB_PROVIDER } from './influx.constants';

@Injectable()
export class InfluxService {
  private connection: InfluxDB | null;

  constructor(
    @Inject(INFLUX_DB_PROVIDER)
    private readonly config: ISingleHostConfig,
  ) {
    this.connection = null;
    this.connect();
  }

  public connect(): void {
    this.connection = new InfluxDB(this.config);
  }

  public async write(points: IPoint[], options?: IWriteOptions): Promise<void> {
    await this.connection.writePoints(points, options);
  }

  public async query<T>(
    query: string,
    options?: IQueryOptions,
  ): Promise<IResults<T>> {
    return this.connection.query<T>(query, options);
  }
}
