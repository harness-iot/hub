import { Field, ObjectType, ID, Int } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Generated,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { BaseEntity } from '@harriot-mycodo/database/base.entity';

import { MycodoConversionEntity } from '../conversion/conversion.entity';

@Entity('device_measurements')
@ObjectType()
export class MycodoDeviceMeasurementsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID, { nullable: false })
  unique_id: string;

  @Column('integer')
  @Generated('increment')
  @Field(() => Int)
  id: number;

  @Column({ type: 'text', default: '' })
  @Field(() => String)
  name: string;

  @Column({ type: 'text', nullable: true })
  @Field(() => String, { nullable: true })
  device_type: string;

  @Column({ type: 'text' })
  @Field(() => String)
  device_id: string;

  @Column({ type: 'boolean', default: true })
  @Field(() => Boolean)
  is_enabled: boolean;

  @Column({ type: 'text', default: '' })
  @Field(() => String)
  measurement: string;

  @Column({ type: 'text', default: '' })
  @Field(() => String)
  measurement_type: string;

  @Column({ type: 'text', default: '' })
  @Field(() => String)
  unit: string;

  @Column({ type: 'integer' })
  @Field(() => Int)
  channel: number;

  @Column({ type: 'text', default: 'linear' })
  @Field(() => String)
  rescale_method: string;

  @Column({ type: 'text', default: '(x+2)*3' })
  @Field(() => String)
  rescale_equation: string;

  @Column({ type: 'boolean', default: false })
  @Field(() => Boolean)
  invert_scale: boolean;

  @Column({ type: 'text', default: '' })
  @Field(() => String)
  rescaled_measurement: string;

  @Column({ type: 'text', default: '' })
  @Field(() => String)
  rescaled_unit: string;

  @Column({ type: 'float', default: 0 })
  @Field(() => Int)
  scale_from_min: number;

  @Column({ type: 'float', default: 10 })
  @Field(() => Int)
  scale_from_max: number;

  @Column({ type: 'float', default: 0 })
  @Field(() => Int)
  scale_to_min: number;

  @Column({ type: 'float', default: 20 })
  @Field(() => Int)
  scale_to_max: number;

  @ManyToOne(() => MycodoConversionEntity, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'conversion_id' }])
  @Field(() => MycodoConversionEntity, { nullable: true })
  conversion: MycodoConversionEntity;
}
