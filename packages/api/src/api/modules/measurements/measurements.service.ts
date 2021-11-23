import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  firstValueFrom,
  lastValueFrom,
  Observable,
  of,
  throwError,
} from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';

import { MycodoApiService } from '@harriot-api/mycodo-api/mycodo-api.service';
import { HarriotNodeService } from '@harriot-core/modules/node/node.service';
import { MQTT_PROVIDER } from '@harriot-mqtt/mqtt.constants';
import {
  MEASUREMENTS,
  MEASUREMENT_UNITS,
} from '@harriot-mycodo/constants/measurements.constants';
import { MycodoDeviceMeasurementsService } from '@harriot-mycodo/modules/device-measurements/device-measurements.service';

import { RedisService } from '../../../redis/lib/redis.service';

import { AcquireMeasurementDto } from './dto/acquire-measurement.dto';
import { LastMeasurementsDataDto, LastMeasurementsDto } from './dto/last.dto';
import { MeasurementDetailDto } from './dto/measurement-detail.dto';
import { FindLastMeasurementInput } from './inputs/last.input';

@Injectable()
export class ApiMeasurementsService {
  constructor(
    protected readonly redisService: RedisService,
    protected readonly apiService: MycodoApiService,
    @Inject(MQTT_PROVIDER) private readonly client: ClientProxy,
    protected readonly deviceMeasurementService: MycodoDeviceMeasurementsService,
    protected readonly nodeService: HarriotNodeService,
  ) {}

  public async findLast(
    node_secret: string,
    { mycodo_id, unit, channel, past_seconds }: FindLastMeasurementInput,
  ): Promise<LastMeasurementsDto> {
    try {
      try {
        const redis = this.redisService.getClient();

        const isActive = await redis.get(`node:${node_secret}`);

        if (parseInt(isActive, 10) !== 1) {
          return { loading: true };
        }

        const measurement = await this.apiService.fetch<LastMeasurementsDataDto>(
          {
            endpoint: `measurements/last/${mycodo_id}/${unit}/${channel}/${past_seconds}`,
            method: 'GET',
          },
        );

        if (!measurement.time && !measurement.value) {
          return { loading: true };
        }

        return { loading: false, data: measurement };
      } catch (error) {
        console.log('[ApiMeasurementsService.findLast] error', error);
        return { loading: false, error: 'failed to load measurments' };
      }
    } catch (err) {
      throw err;
    }
  }

  public getUnitDetail(unit: string) {
    const detail = MEASUREMENT_UNITS[unit];

    if (!detail) {
      throw Error(`Failed to find measurement unit detail for unit: ${unit}`);
    }

    return detail;
  }

  public getMeasurementDetail(measurement: string): MeasurementDetailDto {
    const detail = MEASUREMENTS[measurement];

    if (!detail) {
      throw Error(
        `Failed to find measurement detail for measurement: ${measurement}`,
      );
    }

    const units = detail.units.map((key) => {
      const unit = MEASUREMENT_UNITS[key];

      return {
        key,
        ...unit,
      };
    });

    return {
      name: detail.name,
      units,
    };
  }

  public async acquireMeasurement(
    public_key: string,
  ): Promise<AcquireMeasurementDto[]> {
    const node = await this.nodeService.findOne({ where: { public_key } });

    if (!node) {
      throw Error(`node not found with public_key: ${public_key}`);
    }

    const redis = this.redisService.getClient();

    const isConnected = await redis.get(`node:${node.secret_key}`);

    if (isConnected === null) {
      throw Error('node is not connected');
    }

    const deviceMeasurements = await this.deviceMeasurementService.find({
      where: { device_id: public_key },
      relations: ['conversion'],
    });

    const enabledChannels = deviceMeasurements
      .filter((measurement) => measurement.is_enabled)
      .map(() => 1);

    const data = {
      channels: enabledChannels,
      type: 'onetime',
    };

    const response = this.client
      .send(`node/${node.secret_key}`, data)
      .pipe(timeout(3000))
      .pipe(catchError((err) => of(err)))
      .pipe(
        map((response: AcquireMeasurementDto[]) => {
          return response.map((measurement) => {
            const dm = deviceMeasurements.find(
              (m) => m.channel === measurement.channel,
            );

            if (!dm) {
              throw Error(
                `Device measurement not found for channel: ${measurement.channel}`,
              );
            }

            if (!dm.conversion) {
              return measurement;
            }

            // x is used in conversion equation
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const x = measurement.value;
            const convertedMeasurement: string = eval(
              dm.conversion.equation,
            ).toFixed(2);
            return {
              channel: measurement.channel,
              value: convertedMeasurement,
            };
          });
        }),
      );

    return lastValueFrom(response);
  }
}
