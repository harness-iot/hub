import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';

import { MycodoApiService } from '@harriot-api/mycodo-api/mycodo-api.service';
import { MycodoOutputChannelEntity } from '@harriot-mycodo/modules/output-channel/output-channel.entity';
import { MycodoOutputChannelService } from '@harriot-mycodo/modules/output-channel/output-channel.service';

import { OutputChannelSettingsInput } from './inputs/settings.input';
import { OutputChannelStateInput } from './inputs/state.input';

@Injectable()
export class ApiOutputChannelService {
  constructor(
    protected readonly outputChannelService: MycodoOutputChannelService,
    protected readonly apiService: MycodoApiService,
  ) {}

  public async updateState(
    output_id: string,
    input: OutputChannelStateInput,
  ): Promise<string> {
    try {
      const response = await this.apiService.fetch<{ message: string }>({
        endpoint: `outputs/${output_id}`,
        method: 'POST',
        body: JSON.stringify(input),
      });

      return response.message;
    } catch (err) {
      throw err;
    }
  }

  public async updateSettings(
    channel_id: string,
    input: OutputChannelSettingsInput,
  ): Promise<MycodoOutputChannelEntity> {
    try {
      const channel = await this.outputChannelService.findOneOrFail({
        where: { unique_id: channel_id },
      });

      return this.outputChannelService.save({ ...channel, ...input });
    } catch (error) {
      throw error;
    }
  }

  public async findAll(): Promise<MycodoOutputChannelEntity[]> {
    return this.outputChannelService.find();
  }

  public async findById(unique_id: string): Promise<MycodoOutputChannelEntity> {
    return this.outputChannelService.findOne({
      where: { unique_id },
    });
  }

  public async findByOutputPublicKeys(
    public_keys: string[],
  ): Promise<MycodoOutputChannelEntity[]> {
    return this.outputChannelService.find({
      where: { output_id: In([public_keys]) },
    });
  }
}
