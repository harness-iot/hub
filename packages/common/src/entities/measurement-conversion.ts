import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from './base';

@Entity('measurement_conversions')
@ObjectType()
export class MeasurementConversionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  public id!: string;

  @Column('text', { nullable: false })
  @Field(() => String, { nullable: false })
  public convert_unit_from!: string;

  @Column('text', { nullable: false })
  @Field(() => String, { nullable: false })
  public convert_unit_to!: string;

  @Column('text', { nullable: false })
  @Field(() => String, { nullable: false })
  public equation!: string;
}
