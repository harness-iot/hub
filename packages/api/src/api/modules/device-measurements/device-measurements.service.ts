import { Injectable } from '@nestjs/common';

import {
  MEASUREMENTS,
  MEASUREMENT_UNITS,
} from '@harriot-mycodo/constants/measurements.constants';
import { MycodoConversionService } from '@harriot-mycodo/modules/conversion/conversion.service';
import { MycodoDeviceMeasurementsEntity } from '@harriot-mycodo/modules/device-measurements/device-measurements.entity';
import { MycodoDeviceMeasurementsService } from '@harriot-mycodo/modules/device-measurements/device-measurements.service';

import { ConversionDto } from './dto/conversion.dto';
import { DeviceMeasurementDto } from './dto/device_measurement.dto';
import { MeasurementUnitDto } from './dto/measurement-unit.dto';
import { UpdateMeasurementUnitInput } from './inputs/update-unit.input';

@Injectable()
export class ApiDeviceMeasurementsService {
  constructor(
    protected readonly measurementsService: MycodoDeviceMeasurementsService,
    protected readonly conversionService: MycodoConversionService,
  ) {}

  static measurementName(measurement_key: string): string {
    const measurement = MEASUREMENTS[measurement_key];

    if (!measurement) {
      throw Error(
        '[ApiDeviceMeasurementsService:measurementName]: invalid measurement key',
      );
    }

    return measurement.name;
  }

  static measurementUnitDetail(unit: string): MeasurementUnitDto {
    const conversion_unit = MEASUREMENT_UNITS[unit];

    if (!conversion_unit) {
      throw Error(
        '[ApiDeviceMeasurementsService:conversion_unit_detail]: invalid conversion_unit',
      );
    }

    return {
      unit: conversion_unit.unit,
      unit_name: conversion_unit.name,
    };
  }

  public async findAll(
    device_id: string,
  ): Promise<Partial<DeviceMeasurementDto>[]> {
    const devices = await this.measurementsService.find({
      where: { device_id },
      relations: ['conversion'],
    });
    return devices.map((device) => {
      const measurements = {
        ...device,
        measurement: ApiDeviceMeasurementsService.measurementName(
          device.measurement,
        ),
        measurement_detail: ApiDeviceMeasurementsService.measurementUnitDetail(
          device.unit,
        ),
      };

      if (!device.conversion) {
        return measurements;
      }

      const { convert_unit_to } = device.conversion;

      return {
        ...measurements,
        conversion_measurement_detail: ApiDeviceMeasurementsService.measurementUnitDetail(
          convert_unit_to,
        ),
      };
    });
  }

  public async findMeasurementOptions(
    unit: string,
  ): Promise<Partial<ConversionDto>[]> {
    const conversions = await this.conversionService.find({
      where: { convert_unit_from: unit },
    });

    return conversions.map((conversion) => {
      return {
        ...conversion,
        measurement_detail: ApiDeviceMeasurementsService.measurementUnitDetail(
          conversion.convert_unit_to,
        ),
      };
    });
  }

  public async updateUnit({
    unique_id,
    unit,
  }: UpdateMeasurementUnitInput): Promise<MycodoDeviceMeasurementsEntity> {
    const deviceMeasurement = await this.measurementsService.findOne({
      where: { unique_id },
    });

    if (!deviceMeasurement) {
      throw Error('[updateUnit]: device measurement not found');
    }

    if (unit === deviceMeasurement.unit) {
      deviceMeasurement.conversion = null;
      return this.measurementsService.save(deviceMeasurement);
    }

    const conversion = await this.conversionService.findOne({
      where: {
        convert_unit_from: deviceMeasurement.unit,
        convert_unit_to: unit,
      },
    });

    if (!conversion) {
      throw Error(
        `Conversion not found with convert_unit_from: ${deviceMeasurement.unit} and convert_unit_to: ${unit}`,
      );
    }

    deviceMeasurement.conversion = conversion;
    return this.measurementsService.save(deviceMeasurement);
  }
}
