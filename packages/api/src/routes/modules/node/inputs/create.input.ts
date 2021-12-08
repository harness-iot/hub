import { InputType, Field, ID, Int } from '@nestjs/graphql';

import { NodeMeasurementDto, NodeTypeEnum } from '@harriot-hub/common';

@InputType()
export class CreateNodeChannel {
  @Field(() => String, { nullable: true })
  public name?: string;
  @Field(() => Int)
  public channel!: number;
  @Field(() => String)
  public measurement_key!: string;
  @Field(() => String)
  public custom_fields!: string;
}

@InputType()
export class CreateNodeInput {
  @Field(() => String)
  readonly model_name!: string;
  @Field(() => ID)
  readonly public_key!: string;
  @Field(() => ID)
  readonly secret_key!: string;
  @Field(() => String)
  readonly nickname!: string;
  @Field(() => String)
  readonly icon!: string;
  @Field(() => NodeTypeEnum)
  readonly type!: NodeTypeEnum;
  @Field(() => String, { nullable: true })
  public custom_fields!: string;
  @Field(() => [CreateNodeChannel], { nullable: true })
  public channels!: CreateNodeChannel[];
}
