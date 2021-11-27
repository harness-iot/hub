import { Field, ID } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import {
  ConditionalInitiatorConditionEnum,
  ConditionalActorTypeEnum,
  ConditionalInitiatorValueTypeEnum,
} from '../enums';

import { BaseEntity } from './base';
import { ConditionalActionEntity } from './conditional-action';

@Entity('conditionals')
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

  @Column('uuid', { nullable: false })
  @Field(() => ID, { nullable: false })
  public initiator_id!: string;

  @Column('text', { nullable: false })
  @Field(() => ConditionalActorTypeEnum, { nullable: false })
  public initiator_type!: ConditionalActorTypeEnum;

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
