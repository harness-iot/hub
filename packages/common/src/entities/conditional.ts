import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import {
  ConditionalInitiatorConditionEnum,
  ConditionalInitiatorTypeEnum,
  ConditionalInitiatorValueTypeEnum,
} from '../enums';

import { BaseEntity } from './base';
import { ConditionalActionEntity } from './conditional-action';

@Entity('conditionals')
@ObjectType()
export class ConditionalEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  public id: string;

  @Column('boolean', { nullable: false, default: false })
  @Field(() => Boolean, { nullable: false })
  public is_enabled!: boolean;

  @Column('boolean', { nullable: false, default: false })
  @Field(() => Boolean, { nullable: false })
  public is_activated!: boolean;

  @Column('uuid', { nullable: true })
  @Field(() => ID, { nullable: true })
  public initiator_id?: string | null; // nullable for timer - could change

  @Column('text', { nullable: false })
  @Field(() => ConditionalInitiatorTypeEnum, { nullable: false })
  public initiator_type!: ConditionalInitiatorTypeEnum;

  @Column('integer', { nullable: true })
  @Field(() => Int, { nullable: true })
  public initiator_type_channel?: number; // output channel | measurement channel

  @Column('text', { nullable: false })
  @Field(() => String, { nullable: false })
  public initiator_value!: string;

  @Column('text', { nullable: false })
  @Field(() => ConditionalInitiatorValueTypeEnum, { nullable: false })
  public initiator_value_type!: ConditionalInitiatorValueTypeEnum;

  @Column('text', { nullable: false })
  @Field(() => ConditionalInitiatorConditionEnum, { nullable: false })
  public initiator_condition!: ConditionalInitiatorConditionEnum;

  @OneToMany(() => ConditionalActionEntity, (action) => action.conditional)
  @Field(() => [ConditionalActionEntity], { nullable: false })
  public actions: ConditionalActionEntity[];
}
