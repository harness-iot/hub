import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';

import { CreateNodeInput } from '@harriot-api/modules/node/inputs/create.input';
import { MQTT_BASE } from '@harriot-mycodo/constants/mqtt.constants';
import { MycodoCrudService } from '@harriot-mycodo/database/crud.service';
import { MYCODO_DB } from '@harriot-mycodo/database/database.constants';

import { MycodoDeviceMeasurementsService } from '../device-measurements/device-measurements.service';
import { MycodoDisplayOrderService } from '../display-order/display-order.service';
import { MycodoInputChannelService } from '../input-channel/input-channel.service';

import { MycodoInputEntity } from './input.entity';

@Injectable()
export class MycodoInputService extends MycodoCrudService<MycodoInputEntity> {
  constructor(
    @InjectRepository(MycodoInputEntity, MYCODO_DB)
    protected readonly repository: Repository<MycodoInputEntity>,
    protected readonly mycodoDeviceMeasurementService: MycodoDeviceMeasurementsService,
    protected readonly mycodoInputChannelService: MycodoInputChannelService,
    protected readonly mycodoDisplayOrderService: MycodoDisplayOrderService,
  ) {
    super(repository);
  }

  public async create(
    node: CreateNodeInput,
    queryRunner: QueryRunner,
  ): Promise<MycodoInputEntity> {
    try {
      //If input exists delete input and related entities
      const existingInput = await this.findOne({
        where: { unique_id: node.public_key },
      });
      if (existingInput) {
        await queryRunner.manager.delete(MycodoInputEntity, existingInput.id);
        await this.mycodoDeviceMeasurementService.deleteByDeviceId(
          node.public_key,
          queryRunner.manager,
        );
        await this.mycodoInputChannelService.deleteByInputId(
          node.public_key,
          queryRunner.manager,
        );
        await this.mycodoDisplayOrderService.delete(
          'inputs',
          node.public_key,
          queryRunner.manager,
        );
      }

      const custom_options = {
        mqtt_clientid: `hub:${node.secret_key}`,
        ...MQTT_BASE,
      };

      const input = new MycodoInputEntity();
      input.unique_id = node.public_key;
      input.name = node.secret_key;
      input.device = node.model_id;
      input.interface = 'Mycodo';
      input.custom_options = JSON.stringify(custom_options);
      const savedInput = await queryRunner.manager.save(input);

      // To do: only run this in development env
      await this.mycodoDisplayOrderService.create(
        'inputs',
        node.public_key,
        queryRunner.manager,
      );

      // Create input device measurements
      Promise.all(
        node.setup.measurements.map(async (measurement) => {
          await this.mycodoDeviceMeasurementService.create(
            node.public_key,
            measurement,
            queryRunner.manager,
          );

          await this.mycodoInputChannelService.create(
            node,
            measurement,
            queryRunner.manager,
          );
        }),
      );

      return savedInput;
    } catch (error) {
      console.log('[MycodoInputService:create] error: ', error);
      throw error;
    }
  }
}
