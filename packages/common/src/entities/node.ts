import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';

import { NodeTypeEnum } from '../enums';

import { BaseEntity } from './base';
import { NodeChannelEntity } from './node-channel';

@Entity('nodes')
@ObjectType()
export class NodeEntity extends BaseEntity {
  // Node instance_id (generated on reset) is
  // set as node id
  @PrimaryColumn('uuid')
  @Field(() => ID)
  public id!: string;

  @Column('uuid', { nullable: false })
  @Field(() => ID, { nullable: false })
  public public_key!: string;

  // to do: remove
  @Column('uuid', { nullable: false })
  @Field(() => ID, { nullable: false })
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

  @Column({ type: 'boolean', default: true })
  @Field(() => Boolean, { nullable: false })
  public is_enabled!: boolean;

  @Column('text', { nullable: true })
  @Field(() => String, { nullable: true })
  public custom_options?: string | null;

  @OneToMany(() => NodeChannelEntity, (channel) => channel.node)
  @Field(() => [NodeChannelEntity])
  public channels: NodeChannelEntity[];

  // Virtuals
  @Field(() => Boolean, {
    defaultValue: false,
  })
  public is_activated!: boolean;
}
