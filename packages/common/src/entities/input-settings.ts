import { Field, ObjectType, ID, Int } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { BaseEntity } from './base';
import { NodeEntity } from './node';

@Entity('input_settings')
@ObjectType()
export class NodeInputSettingsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  public id!: string;

  @Column({ type: 'float', default: 15.0 })
  @Field(() => Int, { nullable: false })
  public period!: number;

  @Column({ type: 'text', nullable: true })
  @Field(() => String, { nullable: true })
  public custom_options?: string | null;

  @ManyToOne(() => NodeEntity)
  @JoinColumn([{ name: 'node_id' }])
  @Field(() => NodeEntity, { nullable: false })
  public node!: NodeEntity;

  @Column('text')
  @Field(() => ID)
  public node_id: string;
}
