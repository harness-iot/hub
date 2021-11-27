import { Field, ID, InputType } from '@nestjs/graphql';

import {
  ConditionalActorTypeEnum,
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

  @Field(() => ID, { nullable: false })
  public initiator_id!: string;

  @Field(() => ConditionalActorTypeEnum, { nullable: false })
  public initiator_type!: ConditionalActorTypeEnum;

  @Field(() => String, { nullable: false })
  public initiator_value!: string;

  @Field(() => ConditionalInitiatorValueTypeEnum, { nullable: false })
  public initiator_value_type!: ConditionalInitiatorValueTypeEnum;

  @Field(() => ConditionalInitiatorConditionEnum, { nullable: false })
  public initiator_condition!: ConditionalInitiatorConditionEnum;

  @Field(() => [CreateConditionalActionInput], { nullable: false })
  public actions!: CreateConditionalActionInput[];
}
