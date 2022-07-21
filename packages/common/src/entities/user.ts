import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from './base';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;
}
