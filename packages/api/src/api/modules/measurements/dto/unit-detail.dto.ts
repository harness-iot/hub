import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MeasurementUnitDetailDto {
  @Field(() => String)
  public name: string;
  @Field(() => String)
  public unit: string;
}
