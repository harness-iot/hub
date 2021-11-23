import { Field, ObjectType, ID, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm';

import { BaseEntity } from '@harriot-mycodo/database/base.entity';

@Entity('input_channel')
@ObjectType()
export class MycodoInputChannelEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  unique_id: string;

  @Column('integer')
  @Generated('increment')
  @Field(() => Int)
  id: number;

  @Column({ type: 'text', nullable: true })
  @Field(() => String, { nullable: true })
  input_id: string;

  @Column({ type: 'integer', nullable: true })
  @Field(() => Int, { nullable: true })
  channel: number;

  @Column({ type: 'text', default: '' })
  @Field(() => String)
  name: string;

  @Column({ type: 'text', default: '' })
  @Field(() => String)
  custom_options: string;
}
