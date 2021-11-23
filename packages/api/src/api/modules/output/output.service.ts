import { Injectable } from '@nestjs/common';

import { MycodoApiService } from '@harriot-api/mycodo-api/mycodo-api.service';
import { MycodoOutputChannelEntity } from '@harriot-mycodo/modules/output-channel/output-channel.entity';
import { MycodoOutputEntity } from '@harriot-mycodo/modules/output/output.entity';

import { MycodoAllOutputsDto, MycodoOutputDto } from './dto/output.dto';
import { MycodoApiAllOutputs, MycodoApiOutput } from './output.interface';

@Injectable()
export class ApiOutputService {
  constructor(protected readonly apiService: MycodoApiService) {}

  public async findById(mycodo_id: string): Promise<MycodoOutputDto> {
    try {
      const response = await this.apiService.fetch<MycodoApiOutput>({
        endpoint: `outputs/${mycodo_id}`,
        method: 'GET',
      });

      const output: MycodoOutputEntity = response['output device'];
      const channels: MycodoOutputChannelEntity[] =
        response['output device channels'];
      const channelStates: { [key: string]: string } =
        response['output device channel states'];

      if (!output || !channels || !channelStates) {
        throw Error('[ApiOutputService:findById]: mycodo response invalid');
      }

      const channelWithState = channels.map((channel) => {
        const state = channelStates[channel.channel];

        return {
          ...channel,
          state: state ? state : 'off',
        };
      });

      return {
        output_device: output,
        output_device_channels: channelWithState,
      };
    } catch (err) {
      console.log('ERR: ', err);
      throw err;
    }
  }

  public async findAll(): Promise<MycodoAllOutputsDto> {
    const response = await this.apiService.fetch<MycodoApiAllOutputs[]>({
      endpoint: `outputs/`,
      method: 'GET',
    });

    const output_devices: MycodoOutputEntity[] = response['output devices'];
    const output_channels: MycodoOutputChannelEntity[] =
      response['output channels'];

    return { output_devices, output_channels };
  }
}
