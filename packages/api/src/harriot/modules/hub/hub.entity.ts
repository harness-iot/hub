import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from '@harriot-core/database/base.entity';

@Entity('hub')
export class HarriotHubEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public public_key!: string;

  @Column('text')
  public secret_key!: string;
}
