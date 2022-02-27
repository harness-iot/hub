import { Field, ObjectType, ID } from '@nestjs/graphql';
import {
  Entity,
  Column,
  OneToMany,
  PrimaryColumn,
  BeforeInsert,
  AfterLoad,
} from 'typeorm';

import { NodeSettingsFieldDto } from '../dto/node-settings.dto';
import { NodeTypeEnum } from '../enums';

import { BaseEntity } from './base';
import { NodeChannelEntity } from './node-channel';

@Entity('nodes')
@ObjectType()
export class NodeEntity extends BaseEntity {
  // Node instance_id (generated on reset) is
  // set as node id
  @PrimaryColumn('uuid')
  @Field(() => ID)
  public id!: string;

  @Column('text', { nullable: false })
  @Field(() => ID, { nullable: false })
  public public_key!: string;

  @Column('text', { nullable: false })
  @Field(() => NodeTypeEnum, { nullable: false })
  public type!: NodeTypeEnum;

  @Column('text', { nullable: false })
  @Field(() => String, { nullable: false })
  public name!: string;

  @Column('text', { nullable: false })
  @Field(() => String, { nullable: false })
  public nickname!: string;

  @Column('text', { nullable: false })
  @Field(() => String, { nullable: false })
  public icon!: string;

  @Column({ type: 'boolean', default: true })
  @Field(() => Boolean, { nullable: false })
  public is_enabled!: boolean;

  @Column('text', { default: '' })
  public settings_raw: string;

  @Field(() => [NodeSettingsFieldDto])
  public settings: NodeSettingsFieldDto[];

  @OneToMany(() => NodeChannelEntity, (channel) => channel.node, {
    cascade: true,
  })
  @Field(() => [NodeChannelEntity])
  public channels: NodeChannelEntity[];

  @BeforeInsert()
  formatSettingsInput() {
    this.settings_raw = JSON.stringify(this.settings);
  }

  @AfterLoad()
  formatSettingsOutput() {
    this.settings = JSON.parse(this.settings_raw);
  }
}
