import { Field, ObjectType, ID, Int } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  AfterLoad,
  BeforeInsert,
} from 'typeorm';

import { NodeMeasurementDto } from '../dto';
import { NodeSettingsFieldDto } from '../dto/node-settings.dto';
import { measurementMiddleware } from '../middlewares';

import { BaseEntity } from './base';
import { MeasurementConversionEntity } from './measurement-conversion';
import { NodeEntity } from './node';

@Entity('node_channels')
@ObjectType()
export class NodeChannelEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  public id!: string;

  @Column({ type: 'text', nullable: false })
  @Field(() => String, { nullable: false })
  public name!: string;

  @Column({ type: 'boolean', default: true })
  @Field(() => Boolean, { nullable: false })
  public is_enabled!: boolean;

  @Column({ type: 'text', nullable: false })
  public measurement_key!: string;

  @Column({ type: 'text', nullable: false })
  @Field(() => String, { nullable: false })
  public default_measurement_unit!: string;

  @Column({ type: 'integer', nullable: false })
  @Field(() => Int, { nullable: false })
  public channel!: number;

  @Column({ type: 'text', nullable: true })
  @Field(() => String, { nullable: true })
  public icon?: string;

  @Column('text', { default: '' })
  public settings_raw: string;

  @Field(() => [NodeSettingsFieldDto])
  public settings: NodeSettingsFieldDto[];

  @ManyToOne(() => NodeEntity, (node) => node.channels)
  @JoinColumn([{ name: 'node_id' }])
  @Field(() => NodeEntity, { nullable: false })
  public node!: NodeEntity;

  @Column('text')
  @Field(() => ID)
  public node_id: string;

  @ManyToOne(() => MeasurementConversionEntity)
  @JoinColumn([{ name: 'conversion_id' }])
  @Field(() => MeasurementConversionEntity, { nullable: true })
  public conversion?: MeasurementConversionEntity;

  // Virtuals
  @Field(() => NodeMeasurementDto, {
    nullable: false,
    middleware: [measurementMiddleware],
  })
  public measurement!: NodeMeasurementDto;

  @BeforeInsert()
  formatSettingsInput() {
    this.settings_raw = JSON.stringify(this.settings);
  }

  @AfterLoad()
  formatSettingsOutput() {
    this.settings = JSON.parse(this.settings_raw);
  }
}
