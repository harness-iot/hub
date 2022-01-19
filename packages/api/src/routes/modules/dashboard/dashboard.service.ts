import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import {
  DashboardCardEntity,
  DashboardCardEntityService,
} from '@harriot-hub/common';

import { AddDashboardCardInput } from './inputs/add.input';

@Injectable()
export class DashboardRouteService {
  constructor(
    @InjectConnection() private connection: Connection,
    protected readonly dashboardService: DashboardCardEntityService,
  ) {}

  public async findAllCards(): Promise<DashboardCardEntity[]> {
    return this.dashboardService.find();
  }

  public async addCard(
    input: AddDashboardCardInput,
  ): Promise<DashboardCardEntity> {
    const cards = await this.dashboardService.find();

    const cardExists = cards.find(
      (card) => card.controller_id === input.controller_id,
    );

    if (cardExists) {
      throw Error(`Dashboard card ${input.controller_id} already exists`);
    }

    const card = new DashboardCardEntity();
    card.order = cards.length + 1;
    card.controller_id = input.controller_id;
    card.controller_type = input.controller_type;

    return this.dashboardService.save(card);
  }

  public async removeCard(controller_id: string): Promise<boolean> {
    const cards = await this.dashboardService.find();

    const card = cards.find((card) => card.controller_id === controller_id);

    if (!card) {
      return true;
    }

    const queryRunner = this.connection.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      await queryRunner.manager
        .createQueryBuilder()
        .delete()
        .from(DashboardCardEntity)
        .where('id = :id', {
          id: card.id,
        })
        .execute();

      // Update card.order for those cards where order is higher
      // than card order being deleted

      if (cards.length > 1) {
        await queryRunner.manager
          .createQueryBuilder()
          .update(DashboardCardEntity)
          .set({ order: () => '"order" - 1' })
          .where('order > :deletedOrder', {
            deletedOrder: card.order,
          })
          .execute();
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw Error(error);
    } finally {
      await queryRunner.release();
      return true;
    }
  }
}
