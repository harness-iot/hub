import { Field, ObjectType, ID, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { ControllerTypeEnum } from '../enums/controller-type';

import { BaseEntity } from './base';

@Entity('dashboard_cards')
@ObjectType()
export class DashboardCardEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  public id!: string;

  @Column('integer', { nullable: false })
  @Field(() => Int, { nullable: false })
  public order!: number;

  @Column('uuid', { nullable: false })
  @Field(() => ID, { nullable: false })
  public controller_id!: string;

  @Column('text', { nullable: false })
  @Field(() => ControllerTypeEnum, { nullable: false })
  public controller_type!: ControllerTypeEnum;
}
