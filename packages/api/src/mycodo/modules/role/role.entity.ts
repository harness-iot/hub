import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm';

import { BaseEntity } from '@harriot-mycodo/database/base.entity';

@Entity({ name: 'roles' })
export class MycodoRoleEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  unique_id: string;

  @Column('integer')
  @Generated('increment')
  id: number;

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

  @Column('boolean', { nullable: false })
  reset_password: boolean;
}
