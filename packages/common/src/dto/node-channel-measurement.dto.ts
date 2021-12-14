import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class NodeChannelMeasurementDto {
  @Field(() => ID)
  public node_id: string;
  @Field(() => String)
  public channel: string;
  @Field(() => String)
  public measurement: string;
  @Field(() => String)
  public time: Date;
  @Field(() => String)
  public value: string;
}
