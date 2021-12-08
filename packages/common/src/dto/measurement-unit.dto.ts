import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class NodeMeasurementUnitDto {
  @Field(() => String)
  public key: string;
  @Field(() => String)
  public name: string;
  @Field(() => String)
  public unit: string;
}
