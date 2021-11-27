import { Field, ID } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { ConditionalActorTypeEnum } from '../enums';

import { BaseEntity } from './base';
import { ConditionalEntity } from './conditional';

@Entity('conditional_actions')
export class ConditionalActionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  public id: string;

  @Column('uuid', { nullable: false })
  @Field(() => ID, { nullable: false })
  public target_id!: string;

  @Column('text', { nullable: false })
  @Field(() => ConditionalActorTypeEnum, { nullable: false })
  public target_type!: ConditionalActorTypeEnum;

  @Column('text', { nullable: false })
  @Field(() => String, { nullable: false })
  public target_value!: string;

  @Column('text', { nullable: false })
  @Field(() => String, { nullable: false })
  public target_value_type!: string;

  @Column('text', { nullable: false })
  @Field(() => String, { nullable: false })
  public target_duration!: string;

  @Column('text', { nullable: false })
  @Field(() => String, { nullable: false })
  public target_duration_value!: string;

  @ManyToOne(() => ConditionalEntity, (condtional) => condtional.actions)
  public conditional: ConditionalEntity;
}
