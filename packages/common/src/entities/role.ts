import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from './base';

@Entity('roles')
export class RoleEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  public id!: number;

  @Column('varchar', { nullable: false, unique: true })
  name: string;

  @Column('boolean', { nullable: false })
  edit_settings: boolean;

  @Column('boolean', { nullable: false })
  edit_controllers: boolean;

  @Column('boolean', { nullable: false })
  edit_users: boolean;

  @Column('boolean', { nullable: false })
  view_settings: boolean;

  @Column('boolean', { nullable: false })
  view_camera: boolean;

  @Column('boolean', { nullable: false })
  view_stats: boolean;

  @Column('boolean', { nullable: false })
  view_logs: boolean;
}
