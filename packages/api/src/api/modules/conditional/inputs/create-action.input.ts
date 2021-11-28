import { Field, ID, InputType, Int } from '@nestjs/graphql';

import { ConditionalActionTargetTypeEnum } from '@harriot-hub/common';

@InputType()
export class CreateConditionalActionInput {
  @Field(() => ID, { nullable: false })
  public target_id!: string;

  @Field(() => ConditionalActionTargetTypeEnum, { nullable: false })
  public target_type!: ConditionalActionTargetTypeEnum;

  @Field(() => Int, { nullable: true })
  public target_type_channel: number | null;

  @Field(() => String, { nullable: false })
  public target_value!: string;

  @Field(() => String, { nullable: false })
  public target_value_type!: string;

  @Field(() => String, { nullable: true })
  public target_duration!: string | null;

  @Field(() => String, { nullable: true })
  public target_duration_value!: string | null;
}
