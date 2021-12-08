import { Injectable, Logger } from '@nestjs/common';

import {
  NodeInputSettingsEntity,
  NodeInputSettingsEntityService,
} from '@harriot-hub/common';

import { UpdateInputSettingsPeriodInput } from './input/update-period.input';

@Injectable()
export class NodeInputSettingsRouteService {
  constructor(
    protected readonly settingsService: NodeInputSettingsEntityService,
  ) {}

  public async findByNodeId(node_id: string): Promise<NodeInputSettingsEntity> {
    try {
      const settings = await this.settingsService.findOne({
        where: { node_id },
      });

      return settings;
    } catch (error) {
      Logger.error(
        `[${NodeInputSettingsRouteService.name}].findByNodeId`,
        error,
      );
      throw error;
    }
  }

  public async updatePeriod(
    node_id: string,
    input: UpdateInputSettingsPeriodInput,
  ): Promise<NodeInputSettingsEntity> {
    try {
      const settings = await this.settingsService.findOne({
        where: { node_id },
      });

      if (!settings) {
        throw Error(`failed to find input settings by node_id: ${node_id}`);
      }

      settings.period = input.period;
      return this.settingsService.save(settings);
    } catch (error) {
      Logger.error(
        `[${NodeInputSettingsRouteService.name}].updatePeriod`,
        error,
      );
      throw error;
    }
  }
}
