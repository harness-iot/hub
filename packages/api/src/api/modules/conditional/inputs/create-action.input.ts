import { Field, ID, InputType } from '@nestjs/graphql';

import { ConditionalActorTypeEnum } from '@harriot-hub/common';

@InputType()
export class CreateConditionalActionInput {
  @Field(() => ID, { nullable: false })
  public target_id!: string;

  @Field(() => ConditionalActorTypeEnum, { nullable: false })
  public target_type!: ConditionalActorTypeEnum;

  @Field(() => String, { nullable: false })
  public target_value!: string;

  @Field(() => String, { nullable: false })
  public target_value_type!: string;

  @Field(() => String, { nullable: true })
  public target_duration!: string | null;

  @Field(() => String, { nullable: true })
  public target_duration_value!: string | null;
}
