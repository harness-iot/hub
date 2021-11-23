import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';

import { ApiAuthGuard } from '@harriot-api/auth/auth.guard';
import { MycodoDeviceMeasurementsEntity } from '@harriot-mycodo/modules/device-measurements/device-measurements.entity';

import { ApiDeviceMeasurementsService } from './device-measurements.service';
import { ConversionDto } from './dto/conversion.dto';
import { DeviceMeasurementDto } from './dto/device_measurement.dto';
import { UpdateMeasurementUnitInput } from './inputs/update-unit.input';

@Resolver('api/device-measurements')
@UseGuards(ApiAuthGuard)
export class ApiDeviceMeasurementsResolver {
  constructor(
    private readonly deviceMeasurementService: ApiDeviceMeasurementsService,
  ) {}

  @Query(() => [DeviceMeasurementDto])
  async findDeviceMeasurements(
    @Args({ name: 'device_id', type: () => ID }) device_id: string,
  ): Promise<Partial<DeviceMeasurementDto>[]> {
    return this.deviceMeasurementService.findAll(device_id);
  }

  @Query(() => [ConversionDto])
  async findMeasurementUnitOptions(
    @Args('unit') unit: string,
  ): Promise<Partial<ConversionDto>[]> {
    return this.deviceMeasurementService.findMeasurementOptions(unit);
  }

  @Mutation(() => MycodoDeviceMeasurementsEntity)
  async convertMeasurementUnit(
    @Args('input') input: UpdateMeasurementUnitInput,
  ): Promise<MycodoDeviceMeasurementsEntity> {
    return this.deviceMeasurementService.updateUnit(input);
  }
}
