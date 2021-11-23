import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('displayorder')
export class MycodoDisplayOrderEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text', { default: '' })
  dashboard: string;

  @Column('text', { default: '' })
  function: string;

  @Column('text', { default: '' })
  inputs: string;

  @Column('text', { default: '' })
  lcd: string;

  @Column('text', { default: '' })
  math: string;

  @Column('text', { default: '' })
  method: string;

  @Column('text', { default: '' })
  output: string;

  @Column('text', { default: '' })
  remote_host: string;

  @Column('text', { default: '' })
  timer: string;
}
