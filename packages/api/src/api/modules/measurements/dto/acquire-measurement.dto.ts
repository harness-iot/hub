import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AcquireMeasurementDto {
  @Field(() => Int)
  public channel: number;
  @Field(() => String)
  public value: string;
}
