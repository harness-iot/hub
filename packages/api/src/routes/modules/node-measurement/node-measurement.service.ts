import { Injectable } from '@nestjs/common';

import { InfluxService, NodeChannelMeasurementDto } from '@harriot-hub/common';

interface InfluxResults {
  time: Date;
  channel: number;
  value: string;
  node_id: string;
  measurement: string;
}

@Injectable()
export class NodeMeasurementRouteService {
  constructor(protected readonly influxService: InfluxService) {}

  public async lastMeasurement(
    node_id: string,
  ): Promise<NodeChannelMeasurementDto> {
    const unit = 'C';

    const queryRaw = await this.influxService.query<NodeChannelMeasurementDto>(
      `SELECT * FROM ${unit} WHERE node_id='${node_id}' ORDER BY DESC LIMIT 1`,
    );

    return queryRaw[0];
  }
}
