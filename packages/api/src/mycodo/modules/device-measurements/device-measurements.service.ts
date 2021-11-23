import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, EntityManager, Repository } from 'typeorm';

import { CreateNodeMeasurement } from '@harriot-api/modules/node/inputs/create.input';
import { MEASUREMENTS } from '@harriot-mycodo/constants/measurements.constants';
import { MycodoCrudService } from '@harriot-mycodo/database/crud.service';
import { MYCODO_DB } from '@harriot-mycodo/database/database.constants';

import { MycodoDeviceMeasurementsEntity } from './device-measurements.entity';

@Injectable()
export class MycodoDeviceMeasurementsService extends MycodoCrudService<MycodoDeviceMeasurementsEntity> {
  constructor(
    @InjectRepository(MycodoDeviceMeasurementsEntity, MYCODO_DB)
    protected readonly repository: Repository<MycodoDeviceMeasurementsEntity>,
  ) {
    super(repository);
  }

  public async create(
    input_id: string,
    measurement: CreateNodeMeasurement,
    transaction: EntityManager,
  ): Promise<void> {
    const measurement_detail = MEASUREMENTS[measurement.name];

    if (!measurement_detail) {
      throw Error(
        '[MycodoDeviceMeasurementsService:create] invalid measurement provided ',
      );
    }

    const device_measurement = new MycodoDeviceMeasurementsEntity();
    device_measurement.device_id = input_id;
    device_measurement.measurement = measurement.name;
    device_measurement.unit = measurement_detail.units[0];
    device_measurement.channel = measurement.channel;
    await transaction.save(device_measurement);
  }

  public async deleteByDeviceId(
    device_id: string,
    transaction: EntityManager,
  ): Promise<DeleteResult> {
    // Cascade should also take care of deleting conversions
    return transaction.delete(MycodoDeviceMeasurementsEntity, { device_id });
  }
}
