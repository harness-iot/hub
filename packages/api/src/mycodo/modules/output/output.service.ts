import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';

import { CreateNodeInput } from '@harriot-api/modules/node/inputs/create.input';
import { MycodoCrudService } from '@harriot-mycodo/database/crud.service';
import { MYCODO_DB } from '@harriot-mycodo/database/database.constants';

import { MycodoDeviceMeasurementsService } from '../device-measurements/device-measurements.service';
import { MycodoDisplayOrderService } from '../display-order/display-order.service';
import { MycodoOutputChannelService } from '../output-channel/output-channel.service';

import { MycodoOutputEntity } from './output.entity';

@Injectable()
export class MycodoOutputService extends MycodoCrudService<MycodoOutputEntity> {
  constructor(
    @InjectRepository(MycodoOutputEntity, MYCODO_DB)
    protected readonly repository: Repository<MycodoOutputEntity>,
    protected readonly mycodoDeviceMeasurementService: MycodoDeviceMeasurementsService,
    protected readonly mycodoOutputChannelService: MycodoOutputChannelService,
    protected readonly mycodoDisplayOrderService: MycodoDisplayOrderService,
  ) {
    super(repository);
  }

  public async create(
    node: CreateNodeInput,
    queryRunner: QueryRunner,
  ): Promise<MycodoOutputEntity> {
    try {
      //If outpput exists delete output and related entities
      const existingOutput = await this.findOne({
        where: { unique_id: node.public_key },
      });

      if (existingOutput) {
        await queryRunner.manager.delete(MycodoOutputEntity, existingOutput.id);
        await this.mycodoDeviceMeasurementService.deleteByDeviceId(
          node.public_key,
          queryRunner.manager,
        );
        await this.mycodoOutputChannelService.deleteByOutputId(
          node.public_key,
          queryRunner.manager,
        );
        await this.mycodoDisplayOrderService.delete(
          'output',
          node.public_key,
          queryRunner.manager,
        );
      }

      const output = new MycodoOutputEntity();
      output.unique_id = node.public_key;
      output.name = node.secret_key;
      output.output_type = node.model_id;
      output.interface = 'MYCODO';
      const savedOutput = await queryRunner.manager.save(output);

      // To do: only run this in development env
      await this.mycodoDisplayOrderService.create(
        'output',
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
        }),
      );

      // Create input channels
      Promise.all(
        node.channels.map(async (channel) => {
          // Create input channels
          await this.mycodoOutputChannelService.create(
            node,
            channel,
            queryRunner.manager,
          );
        }),
      );

      return savedOutput;
    } catch (error) {
      console.log('[MycodoOutputService:create] error: ', error);
      throw error;
    }
  }
}
