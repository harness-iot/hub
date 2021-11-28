import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection, QueryRunner } from 'typeorm';

import { HARRIOT_DB } from '@harriot-core/database/database.constants';
import {
  ConditionalActionEntity,
  ConditionalEntity,
} from '@harriot-hub/common';

import { CreateConditionalActionInput } from './inputs/create-action.input';
import { CreateConditionalInput } from './inputs/create.input';

@Injectable()
export class ApiConditionalService {
  constructor(@InjectConnection(HARRIOT_DB) private connection: Connection) {}

  public async createAction(
    action: CreateConditionalActionInput,
    conditional: ConditionalEntity,
    queryRunner: QueryRunner,
  ): Promise<ConditionalActionEntity> {
    const entity = new ConditionalActionEntity();
    Object.assign(entity, action);
    entity.conditional = conditional;
    return queryRunner.manager.save(entity);
  }

  public async create(
    input: CreateConditionalInput,
  ): Promise<ConditionalEntity> {
    const queryRunner = this.connection.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const conditional = new ConditionalEntity();
      conditional.is_enabled = true;
      conditional.is_activated = input.is_activated;
      conditional.initiator_id = input.initiator_id;
      conditional.initiator_type = input.initiator_type;
      conditional.initiator_type_channel = input.initiator_type_channel;
      conditional.initiator_value = input.initiator_value;
      conditional.initiator_value_type = input.initiator_value_type;
      conditional.initiator_condition = input.initiator_condition;
      const savedConditional = await queryRunner.manager.save(conditional);

      await Promise.all(
        input.actions.map((action) =>
          this.createAction(action, savedConditional, queryRunner),
        ),
      );

      await queryRunner.commitTransaction();
      return savedConditional;
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
