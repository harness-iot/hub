import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class NodeChannelMeasurementDto {
  @Field(() => ID)
  public node_id: string;
  @Field(() => Int)
  public channel: number;
  @Field(() => String)
  public measurement: string;
  @Field(() => String)
  public time: string;
  @Field(() => String)
  public value: string;
}
