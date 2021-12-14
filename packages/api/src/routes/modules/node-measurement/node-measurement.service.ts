import { Injectable } from '@nestjs/common';

import {
  InfluxService,
  NodeChannelEntity,
  NodeChannelEntityService,
  NodeChannelMeasurementDto,
  RedisService,
} from '@harriot-hub/common';

import { LastMeasurementInput } from './input/update-period.input';

@Injectable()
export class NodeMeasurementRouteService {
  constructor(
    protected readonly influxService: InfluxService,
    protected readonly redisService: RedisService,
    protected readonly channelService: NodeChannelEntityService,
  ) {}

  // Implement caching as lastMeasurement
  // is likely to be polled with frequencey
  private async getNodeChannels(
    input: LastMeasurementInput,
  ): Promise<NodeChannelEntity[]> {
    const cachedChannels =
      await this.redisService.getNodeChannelsForMeasurements(input.node_id);

    if (cachedChannels) {
      return cachedChannels;
    }

    const channels = await this.channelService.find({
      where: { node_id: input.node_id },
      relations: ['conversion'],
    });

    const polling_duration_buffer = input.past_seconds + 10;

    await this.redisService.setNodeChannelsForMeasurements(
      input.node_id,
      channels,
      polling_duration_buffer,
    );

    return channels;
  }

  public async lastMeasurement(
    input: LastMeasurementInput,
  ): Promise<NodeChannelMeasurementDto[]> {
    const channels = await this.getNodeChannels(input);

    const units = channels
      .filter((channel) => channel.is_enabled)
      .map((channel) => channel.default_measurement_unit)
      .join(',');

    const results = await this.influxService.query<NodeChannelMeasurementDto>(
      `SELECT * FROM ${units} WHERE node_id='${input.node_id}' AND time > now() - ${input.past_seconds}s ORDER BY DESC LIMIT 1`,
    );

    return results.map((result) => {
      const channel = channels.find(
        (channel) => channel.channel === parseInt(result.channel, 10),
      );

      if (!channel) {
        throw Error(
          `Failed to find channel for measurement ${result.measurement}`,
        );
      }

      if (channel.conversion) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const x = result.value;
        const convertedValue: string = eval(
          channel.conversion.equation,
        ).toFixed(2);

        return {
          ...result,
          value: convertedValue,
        };
      }

      return result;
    });
  }
}
