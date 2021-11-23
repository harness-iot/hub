import { Field, ObjectType, ID, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryColumn, Generated } from 'typeorm';

import { BaseEntity } from '@harriot-mycodo/database/base.entity';

@Entity('output')
@ObjectType()
export class MycodoOutputEntity extends BaseEntity {
  @PrimaryColumn({ type: 'uuid', nullable: false, unique: true })
  @Field(() => ID)
  unique_id: string;

  @Column('integer')
  @Generated('increment')
  @Field(() => Int)
  id: number;

  @Column({ type: 'text', default: 'wired' })
  @Field(() => String)
  output_type: string;

  @Column({ type: 'text', default: 'Output' })
  @Field(() => String)
  name: string;

  @Column({ type: 'boolean', default: false })
  @Field(() => Boolean)
  log_level_debug: boolean;

  @Column({ type: 'text', default: '' })
  @Field(() => String)
  interface: string;

  @Column({ type: 'text', default: '' })
  @Field(() => String)
  location: string;

  @Column({ type: 'text', nullable: true })
  @Field(() => String, { nullable: true })
  i2c_location: string;

  @Column({ type: 'integer', default: 1 })
  @Field(() => Int)
  i2c_bus: number;

  @Column({ type: 'text', nullable: true })
  @Field(() => String, { nullable: true })
  ftdi_location: string;

  @Column({ type: 'text', nullable: true })
  @Field(() => String, { nullable: true })
  uart_location: string;

  @Column({ type: 'integer', nullable: true })
  @Field(() => Int, { nullable: true })
  baud_rate: number;

  @Column({ type: 'text', default: '' })
  @Field(() => String)
  custom_options: string;

  @Column({ type: 'integer', nullable: true })
  @Field(() => Int, { nullable: true })
  pin: number;

  @Column({ type: 'boolean', default: true })
  @Field(() => Boolean)
  on_state: boolean;

  @Column({ type: 'float', default: 0.0 })
  @Field(() => Int)
  amps: number;

  @Column({ type: 'datetime', nullable: true })
  @Field(() => String, { nullable: true })
  on_until: string;

  @Column({ type: 'datetime', nullable: true })
  @Field(() => String, { nullable: true })
  off_until: string;

  @Column({ type: 'float', nullable: true })
  @Field(() => Int, { nullable: true })
  last_duration: number;

  @Column({ type: 'boolean', nullable: true })
  @Field(() => Boolean, { nullable: true })
  on_duration: boolean;

  @Column({ type: 'integer', nullable: true })
  @Field(() => Int, { nullable: true })
  protocol: number;

  @Column({ type: 'integer', nullable: true })
  @Field(() => Int, { nullable: true })
  pulse_length: number;

  @Column({ type: 'text', nullable: true })
  @Field(() => String, { nullable: true })
  linux_command_user: string;

  @Column({ type: 'text', nullable: true })
  @Field(() => String, { nullable: true })
  on_command: string;

  @Column({ type: 'text', nullable: true })
  @Field(() => String, { nullable: true })
  off_command: string;

  @Column({ type: 'text', nullable: true })
  @Field(() => String, { nullable: true })
  pwm_command: string;

  @Column({ type: 'boolean', default: false })
  @Field(() => Boolean)
  force_command: boolean;

  @Column({ type: 'boolean', default: true })
  @Field(() => Boolean)
  trigger_functions_at_start: boolean;

  @Column({ type: 'text', nullable: true })
  @Field(() => String, { nullable: true })
  state_startup: string;

  @Column({ type: 'float', default: 0 })
  @Field(() => Int)
  startup_value: number;

  @Column({ type: 'text', nullable: true })
  @Field(() => String, { nullable: true })
  state_shutdown: string;

  @Column({ type: 'float', default: 0 })
  @Field(() => Int)
  shutdown_value: number;

  @Column({ type: 'integer', nullable: true })
  @Field(() => Int, { nullable: true })
  pwm_hertz: number;

  @Column({ type: 'text', nullable: true })
  @Field(() => String, { nullable: true })
  pwm_library: string;

  @Column({ type: 'boolean', default: false })
  @Field(() => Boolean)
  pwm_invert_signal: boolean;

  @Column({ type: 'float', nullable: true })
  @Field(() => Int, { nullable: true })
  flow_rate: number;

  @Column({ type: 'text', nullable: true })
  @Field(() => String, { nullable: true })
  output_mode: string;
}
