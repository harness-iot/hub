import { Field, ObjectType, ID, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryColumn, Generated } from 'typeorm';

import { BaseEntity } from '@harriot-mycodo/database/base.entity';

@Entity('input')
@ObjectType()
export class MycodoInputEntity extends BaseEntity {
  @PrimaryColumn({ type: 'uuid', nullable: false, unique: true })
  @Field(() => ID)
  unique_id: string;

  @Column('integer')
  @Generated('increment')
  @Field(() => Int)
  id: number;

  @Column({ type: 'text', default: 'Input Name' })
  @Field(() => String)
  name: string;

  @Column({ type: 'boolean', default: false })
  @Field(() => Boolean)
  is_activated: boolean;

  @Column({ type: 'boolean', default: false })
  @Field(() => Boolean)
  log_level_debug: boolean;

  @Column({ type: 'boolean', default: false })
  @Field(() => Boolean)
  is_preset: boolean;

  @Column({ type: 'text', nullable: true })
  @Field(() => String, { nullable: true })
  preset_name: string;

  @Column({ type: 'text', default: '' })
  @Field(() => String)
  device: string;

  @Column({ type: 'text', nullable: true })
  @Field(() => String, { nullable: true })
  interface: string;

  @Column({ type: 'float', default: 15.0 })
  @Field(() => Int)
  period: number;

  @Column({ type: 'float', default: 0.0 })
  @Field(() => Int)
  start_offset: number;

  @Column({ type: 'text', nullable: true })
  @Field(() => String, { nullable: true })
  power_output_id: string;

  @Column({ type: 'integer', default: 0 })
  @Field(() => Int, { nullable: true })
  resolution: number;

  @Column({ type: 'integer', default: 0 })
  @Field(() => Int, { nullable: true })
  resolution_2: number;

  @Column({ type: 'integer', default: 0 })
  @Field(() => Int, { nullable: true })
  sensitivity: number;

  @Column({ type: 'text', nullable: true })
  @Field(() => String, { nullable: true })
  thermocouple_type: string;

  @Column({ type: 'integer', nullable: true })
  @Field(() => Int, { nullable: true })
  ref_ohm: number;

  @Column({ type: 'text', nullable: true })
  @Field(() => String, { nullable: true })
  calibrate_sensor_measure: string;

  @Column({ type: 'text', default: '' })
  @Field(() => String)
  location: string;

  @Column({ type: 'integer', default: 0 })
  @Field(() => Int)
  gpio_location: number;

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

  @Column({ type: 'integer', nullable: true })
  @Field(() => Int, { nullable: true })
  pin_clock: number;

  @Column({ type: 'integer', nullable: true })
  @Field(() => Int, { nullable: true })
  pin_cs: number;

  @Column({ type: 'integer', nullable: true })
  @Field(() => Int, { nullable: true })
  pin_mosi: number;

  @Column({ type: 'integer', nullable: true })
  @Field(() => Int, { nullable: true })
  pin_miso: number;

  @Column({ type: 'text', default: 'hci0' })
  @Field(() => String)
  bt_adapter: string;

  @Column({ type: 'text', default: 'rising' })
  @Field(() => String)
  switch_edge: string;

  @Column({ type: 'integer', default: 50 })
  @Field(() => Int)
  switch_bouncetime: number;

  @Column({ type: 'integer', default: 10 })
  @Field(() => Int)
  switch_reset_period: number;

  @Column({ type: 'text', nullable: true })
  @Field(() => String, { nullable: true })
  pre_output_id: string;

  @Column({ type: 'float', default: 10.0 })
  @Field(() => Int, { nullable: true })
  pre_output_duration: number;

  @Column({ type: 'boolean', default: true })
  @Field(() => Boolean)
  pre_output_during_measure: boolean;

  @Column({ type: 'text', default: '3.5' })
  @Field(() => String)
  sht_voltage: string;

  @Column({ type: 'integer', default: 1 })
  @Field(() => Int)
  adc_gain: number;

  @Column({ type: 'integer', default: 18 })
  @Field(() => Int)
  adc_resolution: number;

  @Column({ type: 'text', default: '' })
  @Field(() => String)
  adc_sample_speed: string;

  @Column({ type: 'text', nullable: true })
  @Field(() => String, { nullable: true })
  cmd_command: string;

  @Column({ type: 'float', default: 0.0 })
  @Field(() => Int)
  weighting: number;

  @Column({ type: 'float', default: 1.0 })
  @Field(() => Int)
  rpm_pulses_per_rev: number;

  @Column({ type: 'float', default: 2.0 })
  @Field(() => Int)
  sample_time: number;

  @Column({ type: 'integer', default: 80 })
  @Field(() => Int)
  port: number;

  @Column({ type: 'integer', default: 1 })
  @Field(() => Int)
  times_check: number;

  @Column({ type: 'integer', default: 2 })
  @Field(() => Int)
  deadline: number;

  @Column({ type: 'datetime', nullable: true })
  @Field(() => String, { nullable: true })
  datetime: Date;

  @Column({ type: 'text', default: '' })
  @Field(() => String)
  custom_options: string;
}
