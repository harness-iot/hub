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

@Entity('output_settings')
@ObjectType()
export class NodeOutputSettingsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  public id!: string;

  @Column({ type: 'integer', nullable: false })
  @Field(() => Int, { nullable: false })
  public channel!: number;

  @Column({ type: 'text', default: 'off' })
  @Field(() => String, { nullable: true })
  public state_startup!: string;

  @Column({ type: 'float', default: 0 })
  @Field(() => Int)
  public startup_value!: number;

  @Column({ type: 'text', default: 'off' })
  @Field(() => String, { nullable: true })
  public state_shutdown!: string;

  @Column({ type: 'float', default: 0 })
  @Field(() => Int)
  public shutdown_value!: number;

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
