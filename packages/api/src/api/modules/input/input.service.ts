import { Injectable } from '@nestjs/common';

import { MycodoApiService } from '@harriot-api/mycodo-api/mycodo-api.service';
import { MycodoDeviceMeasurementsEntity } from '@harriot-mycodo/modules/device-measurements/device-measurements.entity';
import { MycodoInputChannelEntity } from '@harriot-mycodo/modules/input-channel/input-channel.entity';
import { MycodoInputEntity } from '@harriot-mycodo/modules/input/input.entity';
import { MycodoInputService } from '@harriot-mycodo/modules/input/input.service';
import { MycodoUserService } from '@harriot-mycodo/modules/user/user.service';

import { MycodoInputDto } from './dto/input.dto';
import { UpdateInputSettingsInput } from './inputs/update.input';

@Injectable()
export class ApiInputService {
  constructor(
    protected readonly apiService: MycodoApiService,
    protected readonly inputService: MycodoInputService,
    protected readonly mcUserService: MycodoUserService,
  ) {}

  public findOne(unique_id: string): Promise<MycodoInputEntity> {
    return this.inputService.findOne({ where: { unique_id } });
  }

  public async findById(mycodo_id: string): Promise<MycodoInputDto> {
    try {
      const response = await this.apiService.fetch<MycodoInputDto>({
        endpoint: `inputs/${mycodo_id}`,
        method: 'GET',
      });

      const input_settings: MycodoInputEntity = response['input settings'];
      const device_measurements: MycodoDeviceMeasurementsEntity[] =
        response['device measurements'];
      const input_channels: MycodoInputChannelEntity[] =
        response['input channels'];

      if (!input_settings || !device_measurements || !input_channels) {
        throw Error('[ApiInputService:findById]: mycodo response invalid');
      }

      return {
        input_settings,
        device_measurements: device_measurements.map((measurement) => {
          return {
            ...measurement,
            conversion: measurement.conversion.unique_id
              ? measurement.conversion
              : null,
          };
        }),
        input_channels,
      };
    } catch (err) {
      console.log('ERR: ', err);
      throw err;
    }
  }

  public async update(
    unique_id: string,
    input: UpdateInputSettingsInput,
  ): Promise<MycodoInputEntity> {
    try {
      const entity = await this.inputService.findOneOrFail({
        where: { unique_id },
      });

      return this.inputService.save({ ...entity, ...input });
    } catch (error) {
      throw error;
    }
  }
}
