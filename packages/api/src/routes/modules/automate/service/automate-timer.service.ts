import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { InjectConnection } from '@nestjs/typeorm';
import { CronJob } from 'cron';
import { Connection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { OutputControllerService } from '@harriot-controller/output/output-controller.service';
import {
  ConditionalActionEntity,
  ConditionalEntity,
  ConditionalInitiatorTypeEnum,
  ConditionalInitiatorValueTypeEnum,
} from '@harriot-hub/common';

import { CreateTimeAutomationInput } from '../inputs/create-time.input';

@Injectable()
export class AutomateRouteTimerService {
  constructor(
    @InjectConnection() private connection: Connection,
    private schedulerRegistry: SchedulerRegistry,
    protected readonly outputControllerService: OutputControllerService,
  ) {}

  public async create(
    input: CreateTimeAutomationInput,
  ): Promise<ConditionalEntity> {
    const queryRunner = this.connection.createQueryRunner();

    const cronId = uuidv4();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const conditional = new ConditionalEntity();
      conditional.initiator_id = cronId;
      conditional.initiator_type = ConditionalInitiatorTypeEnum.TIME;
      conditional.initiator_value = input.time.cron;
      conditional.initiator_value_type =
        ConditionalInitiatorValueTypeEnum.STRING;
      conditional.is_activated = true;
      const savedConditional = await queryRunner.manager.save(conditional);

      await Promise.all(
        input.actions.map(async (action) => {
          const conditionalAction = new ConditionalActionEntity();
          conditionalAction.target_id = action.target_id;
          conditionalAction.target_type = action.target_type;
          conditionalAction.target_type_channel = action.target_type_channel;
          conditionalAction.target_action_state = action.target_action_state;
          conditionalAction.conditional = savedConditional;
          const savedConditionalAction = await queryRunner.manager.save(
            conditionalAction,
          );
          savedConditional.actions.push(savedConditionalAction);
        }),
      );

      const job = new CronJob(input.time.cron, () => {
        Logger.log(`RUN CRON JOB: ${input.time.cron}`);
      });

      this.schedulerRegistry.addCronJob(cronId, job);

      await queryRunner.commitTransaction();

      job.start();

      return savedConditional;
    } catch (err) {
      this.schedulerRegistry.deleteCronJob(cronId);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
