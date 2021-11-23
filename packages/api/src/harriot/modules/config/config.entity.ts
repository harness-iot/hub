import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from '@harriot-core/database/base.entity';

@Entity('config')
export class HarriotConfigEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  public id!: number;

  @Column('text')
  public name!: string;

  @Column('text')
  public value!: string;
}
