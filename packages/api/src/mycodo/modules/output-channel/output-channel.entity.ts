import { Field, ObjectType, ID, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm';

import { BaseEntity } from '@harriot-mycodo/database/base.entity';

@Entity('output_channel')
@ObjectType()
export class MycodoOutputChannelEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  unique_id: string;

  @Column('integer')
  @Generated('increment')
  @Field(() => Int)
  id: number;

  @Column({ type: 'uuid' })
  @Field(() => ID)
  output_id: string;

  @Column({ type: 'integer' })
  @Field(() => Int)
  channel: number;

  @Column({ type: 'text', default: '' })
  @Field(() => String)
  name: string;

  @Column({ type: 'text', default: '' })
  @Field(() => String)
  custom_options: string;
}
