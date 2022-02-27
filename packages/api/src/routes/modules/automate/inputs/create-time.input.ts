import { InputType, Field, ID, Int } from '@nestjs/graphql';

import {
  ConditionalTargetActiveStateEnum,
  ControllerTypeEnum,
} from '@harriot-hub/common';

import { TimeAutomationTypeEnum } from '../enums/time-type.enum';

@InputType()
export class CreateTimeAutomationInitiatorInput {
  @Field(() => TimeAutomationTypeEnum)
  readonly type!: TimeAutomationTypeEnum;

  @Field(() => String)
  readonly cron!: string;
}

@InputType()
export class CreateTimeAutomationActionInput {
  @Field(() => ID)
  readonly target_id!: string;

  @Field(() => ControllerTypeEnum)
  readonly target_type!: ControllerTypeEnum;

  @Field(() => Int, { nullable: true })
  readonly target_type_channel?: number | null;

  @Field(() => ConditionalTargetActiveStateEnum)
  public target_action_state!: ConditionalTargetActiveStateEnum;
}

@InputType()
export class CreateTimeAutomationInput {
  @Field(() => CreateTimeAutomationInitiatorInput)
  readonly time!: CreateTimeAutomationInitiatorInput;

  @Field(() => [CreateTimeAutomationActionInput])
  readonly actions!: CreateTimeAutomationActionInput[];
}
