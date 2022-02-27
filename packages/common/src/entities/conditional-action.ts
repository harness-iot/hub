import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BeforeInsert,
  AfterLoad,
} from 'typeorm';

import { NodeSettingsFieldDto } from '../dto/node-settings.dto';
import { ConditionalTargetActiveStateEnum, ControllerTypeEnum } from '../enums';

import { BaseEntity } from './base';
import { ConditionalEntity } from './conditional';

@Entity('conditional_actions')
@ObjectType()
export class ConditionalActionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  public id: string;

  @Column('uuid', { nullable: false })
  @Field(() => ID, { nullable: false })
  public target_id!: string;

  @Column('text', { nullable: false })
  @Field(() => ControllerTypeEnum, { nullable: false })
  public target_type!: ControllerTypeEnum;

  @Column('integer', { nullable: true })
  @Field(() => Int, { nullable: true })
  public target_type_channel?: number; // output channel only (input enables all measurements)

  @Column('text', { nullable: false })
  @Field(() => ConditionalTargetActiveStateEnum, { nullable: false })
  public target_action_state!: ConditionalTargetActiveStateEnum;

  @Column('text', { default: '' })
  public target_settings_raw: string;

  @Field(() => [NodeSettingsFieldDto])
  public target_settings: NodeSettingsFieldDto[];

  @ManyToOne(() => ConditionalEntity, (condtional) => condtional.actions)
  public conditional: ConditionalEntity;

  @BeforeInsert()
  formatSettingsInput() {
    this.target_settings_raw = JSON.stringify(this.target_settings);
  }

  @AfterLoad()
  formatSettingsOutput() {
    this.target_settings = JSON.parse(this.target_settings_raw);
  }
}
