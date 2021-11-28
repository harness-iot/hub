import { Field, ID, InputType, Int } from '@nestjs/graphql';

import {
  ConditionalInitiatorTypeEnum,
  ConditionalInitiatorConditionEnum,
  ConditionalInitiatorValueTypeEnum,
} from '@harriot-hub/common';

import { CreateConditionalActionInput } from './create-action.input';

@InputType()
export class CreateConditionalInput {
  @Field(() => Boolean, { nullable: false })
  public is_enabled!: boolean;

  @Field(() => Boolean, { nullable: false })
  public is_activated!: boolean;

  @Field(() => ID, { nullable: true })
  public initiator_id!: string | null;

  @Field(() => ConditionalInitiatorTypeEnum, { nullable: false })
  public initiator_type!: ConditionalInitiatorTypeEnum;

  @Field(() => Int, { nullable: true })
  public initiator_type_channel!: number | null;

  @Field(() => String, { nullable: false })
  public initiator_value!: string;

  @Field(() => ConditionalInitiatorValueTypeEnum, { nullable: false })
  public initiator_value_type!: ConditionalInitiatorValueTypeEnum;

  @Field(() => ConditionalInitiatorConditionEnum, { nullable: false })
  public initiator_condition!: ConditionalInitiatorConditionEnum;

  @Field(() => [CreateConditionalActionInput], { nullable: false })
  public actions!: CreateConditionalActionInput[];
}
