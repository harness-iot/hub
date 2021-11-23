import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm';

import { BaseEntity } from '@harriot-mycodo/database/base.entity';

@Entity('users')
export class MycodoUserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  unique_id: string;

  @Column('integer')
  @Generated('increment')
  id: number;

  @Column({ type: 'varchar', length: 64 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  password_hash: string;

  @Column('blob', { unique: true })
  api_key: Buffer;

  @Column({ type: 'varchar', length: 64 })
  email: string;

  @Column({ type: 'integer', nullable: true })
  role_id: number;

  @Column({ type: 'varchar', length: 64 })
  theme: string;

  @Column('text')
  landing_page: string;

  @Column('text')
  language: string;

  @Column('text')
  password_reset_code: string;

  @Column('datetime')
  password_reset_code_expiration: string;

  @Column('datetime')
  password_reset_last_request: string;
}
