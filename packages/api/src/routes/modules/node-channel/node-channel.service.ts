import { Injectable, Logger } from '@nestjs/common';

import {
  MeasurementConversionEntityService,
  NodeChannelEntity,
  NodeChannelEntityService,
} from '@harriot-hub/common';

import { UpdateChannelNameInput } from './inputs/update-name.input';
import { UpdateChannelMeasurementUnitInput } from './inputs/update-unit.input';
//import { NodeChannelService } from '@harriot-modules/node-channel/node-channel.service';

@Injectable()
export class NodeChannelRouteService {
  constructor(
    protected readonly channelService: NodeChannelEntityService,
    protected readonly conversionService: MeasurementConversionEntityService,
  ) {}

  public async findByNodeId(node_id: string): Promise<NodeChannelEntity[]> {
    try {
      const channels = await this.channelService.find({
        where: { node_id },
        relations: ['conversion'],
      });

      return channels;
    } catch (err) {
      Logger.error(`[${NodeChannelRouteService.name}].findByNodeId`, err);
      throw Error(err);
    }
  }

  public async updateMeasurementUnit(
    input: UpdateChannelMeasurementUnitInput,
  ): Promise<NodeChannelEntity> {
    try {
      const channel = await this.channelService.findOne({
        where: { id: input.id },
        relations: ['conversion'],
      });

      if (!channel) {
        throw Error(`Failed to find channel with id: ${input.id}`);
      }

      const defaultUnit = channel.default_measurement_unit;

      // If updated unit equals default unit then remove conversion relation
      if (defaultUnit === input.unit) {
        channel.conversion = null;
        return this.channelService.save(channel);
      }

      const conversion = await this.conversionService.findOne({
        where: {
          convert_unit_from: defaultUnit,
          convert_unit_to: input.unit,
        },
      });

      if (!conversion) {
        throw Error(
          `Conversion not found with convert_unit_from: ${defaultUnit} and convert_unit_to: ${input.unit}`,
        );
      }

      channel.conversion = conversion;
      return this.channelService.save(channel);
    } catch (error) {}
  }

  public async updateChannelName(
    channel_id: string,
    input: UpdateChannelNameInput,
  ): Promise<NodeChannelEntity> {
    const channel = await this.channelService.findOne({
      where: { id: channel_id },
    });

    if (!channel) {
      throw Error(`Failed to find channel with id: ${channel_id}`);
    }

    channel.name = input.name;
    return this.channelService.save(channel);
  }
}
