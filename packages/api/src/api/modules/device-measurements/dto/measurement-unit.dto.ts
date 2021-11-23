import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MeasurementUnitDto {
  @Field(() => String)
  public unit!: string;
  @Field(() => String)
  public unit_name!: string;
}
