import { Field, ObjectType, ID, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm';

import { BaseEntity } from '@harriot-mycodo/database/base.entity';

@Entity('conversion')
@ObjectType()
export class MycodoConversionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  unique_id: string;

  @Column('integer')
  @Generated('increment')
  @Field(() => Int)
  id: number;

  @Column('text')
  @Field(() => String)
  convert_unit_from: string;

  @Column('text')
  @Field(() => String)
  convert_unit_to: string;

  @Column('text')
  @Field(() => String)
  equation: string;

  @Column('boolean')
  @Field(() => Boolean)
  protected: boolean;
}
