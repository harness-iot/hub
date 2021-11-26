import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { NodeTypeEnum } from '../enums';

import { BaseEntity } from './base';

@Entity('nodes')
@ObjectType()
export class NodeEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  public id!: string;

  @Column('text', { nullable: false })
  @Field(() => ID)
  public model_id!: string;

  @Column('uuid', { nullable: false })
  @Field(() => ID)
  public public_key!: string;

  @Column('uuid', { nullable: false })
  @Field(() => ID)
  public secret_key!: string;

  @Column('text', { nullable: false })
  @Field(() => NodeTypeEnum, { nullable: false })
  public type!: NodeTypeEnum;

  @Column('text', { nullable: false })
  @Field(() => String, { nullable: false })
  public name!: string;

  @Column('text', { nullable: false })
  @Field(() => String, { nullable: false })
  public nickname!: string;

  @Column('text', { nullable: false })
  @Field(() => String, { nullable: false })
  public icon!: string;

  @Column('boolean', { nullable: false })
  @Field(() => Boolean, { nullable: false })
  public is_enabled!: boolean;

  @Column('text', { nullable: true })
  @Field(() => String, { nullable: true })
  public custom_options?: string;
}
