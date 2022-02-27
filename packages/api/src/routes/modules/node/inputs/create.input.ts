import { InputType, Field, ID, Int } from '@nestjs/graphql';

import { NodeTypeEnum } from '@harriot-hub/common';

@InputType()
export class CreateNodeSettingsFieldInput {
  @Field(() => ID)
  public id: string;
  @Field(() => String)
  public key!: string;
  @Field(() => String)
  public value!: string;
}

@InputType()
export class CreateNodeChannel {
  @Field(() => String, { nullable: true })
  public name?: string;
  @Field(() => Int)
  public channel!: number;
  @Field(() => String)
  public measurement_key!: string;
  @Field(() => [CreateNodeSettingsFieldInput])
  public settings!: CreateNodeSettingsFieldInput[];
}

@InputType()
export class CreateNodeInput {
  @Field(() => String)
  readonly model_name!: string;
  @Field(() => String)
  readonly public_key!: string;
  @Field(() => ID)
  readonly instance_key!: string;
  @Field(() => String)
  readonly nickname!: string;
  @Field(() => String)
  readonly icon!: string;
  @Field(() => NodeTypeEnum)
  readonly type!: NodeTypeEnum;
  @Field(() => [CreateNodeSettingsFieldInput])
  public settings!: CreateNodeSettingsFieldInput[];
  @Field(() => [CreateNodeChannel], { nullable: true })
  public channels!: CreateNodeChannel[];
}
