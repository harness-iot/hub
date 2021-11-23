import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  RelationId,
} from 'typeorm';

import { BaseEntity } from '@harriot-core/database/base.entity';

import { HarriotRoleEntity } from '../role/role.entity';

@Entity('users')
export class HarriotUserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => HarriotRoleEntity)
  @JoinColumn({ name: 'role_id' })
  role: HarriotRoleEntity;

  @RelationId((user: HarriotUserEntity) => user.role)
  roleId: number;
}
