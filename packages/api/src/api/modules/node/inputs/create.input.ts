import { InputType, Field, ID, Int } from '@nestjs/graphql';

import { NodeTypeEnum } from '@harriot-core/modules/node/node.enum';

@InputType()
export class CreateNodeChannel {
  @Field(() => String, { nullable: true })
  public name?: string;

  @Field(() => Int)
  public channel!: number;

  @Field(() => String)
  public custom_fields!: string;
}

@InputType()
export class CreateNodeMeasurement {
  @Field(() => String)
  public name!: string;

  @Field(() => Int)
  public channel!: number;
}

@InputType()
export class CreateNodeSetup {
  @Field(() => String)
  readonly nickname!: string;
  @Field(() => String)
  readonly icon!: string;
  @Field(() => [CreateNodeMeasurement])
  public measurements!: CreateNodeMeasurement[];
}

@InputType()
export class CreateNodeInput {
  @Field(() => String)
  readonly model_id!: string;
  @Field(() => String)
  readonly model_name!: string;
  @Field(() => ID)
  readonly public_key!: string;
  @Field(() => ID)
  readonly secret_key!: string;
  @Field(() => NodeTypeEnum)
  readonly type!: NodeTypeEnum;
  @Field(() => String, { nullable: true })
  public custom_fields!: string;
  @Field(() => CreateNodeSetup)
  readonly setup!: CreateNodeSetup;
  @Field(() => [CreateNodeChannel], { nullable: true })
  public channels!: CreateNodeChannel[];
}
