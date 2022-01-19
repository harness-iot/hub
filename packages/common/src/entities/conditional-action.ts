import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { ControllerTypeEnum } from '../enums';

import { BaseEntity } from './base';
import { ConditionalEntity } from './conditional';

@Entity('conditional_actions')
@ObjectType()
export class ConditionalActionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  public id: string;

  @Column('uuid', { nullable: false })
  @Field(() => ID, { nullable: false })
  public target_id!: string;

  @Column('text', { nullable: false })
  @Field(() => ControllerTypeEnum, { nullable: false })
  public target_type!: ControllerTypeEnum;

  @Column('integer', { nullable: true })
  @Field(() => Int, { nullable: true })
  public target_type_channel?: number; // output channel only (input enables all measurements)

  @Column('text', { nullable: false })
  @Field(() => String, { nullable: false })
  public target_value!: string;

  @Column('text', { nullable: false })
  @Field(() => String, { nullable: false })
  public target_value_type!: string;

  @Column('text', { nullable: true })
  @Field(() => String, { nullable: true })
  public target_duration!: string | null;

  @Column('text', { nullable: true })
  @Field(() => String, { nullable: true })
  public target_duration_value!: string | null;

  @ManyToOne(() => ConditionalEntity, (condtional) => condtional.actions)
  public conditional: ConditionalEntity;
}
