import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query, ID } from '@nestjs/graphql';
import { Observable } from 'rxjs';

import { ApiAuthGuard } from '@harriot-api/auth/auth.guard';

import { AcquireMeasurementDto } from './dto/acquire-measurement.dto';
import { LastMeasurementsDto } from './dto/last.dto';
import { MeasurementDetailDto } from './dto/measurement-detail.dto';
import { MeasurementUnitDetailDto } from './dto/unit-detail.dto';
import { FindLastMeasurementInput } from './inputs/last.input';
import { ApiMeasurementsService } from './measurements.service';

@Resolver('api/measurements')
@UseGuards(ApiAuthGuard)
export class ApiMeasurementsResolver {
  constructor(private readonly measurementsService: ApiMeasurementsService) {}

  @Query(() => LastMeasurementsDto)
  async findLastMeasurementByNode(
    @Args({ name: 'node_secret', type: () => ID }) node_secret: string,
    @Args('input')
    input: FindLastMeasurementInput,
  ): Promise<LastMeasurementsDto> {
    return this.measurementsService.findLast(node_secret, input);
  }

  @Query(() => MeasurementUnitDetailDto)
  async findMeasurementDetailByUnit(
    @Args('unit') unit: string,
  ): Promise<MeasurementUnitDetailDto> {
    return this.measurementsService.getUnitDetail(unit);
  }

  @Query(() => MeasurementDetailDto)
  async findUnitsByMeasurementKey(
    @Args('measurement_key') measurement_key: string,
  ): Promise<MeasurementDetailDto> {
    return this.measurementsService.getMeasurementDetail(measurement_key);
  }

  @Query(() => [AcquireMeasurementDto])
  async acquireMeasurement(
    @Args({ name: 'public_key', type: () => ID }) public_key: string,
  ): Promise<AcquireMeasurementDto[]> {
    return this.measurementsService.acquireMeasurement(public_key);
  }
}
