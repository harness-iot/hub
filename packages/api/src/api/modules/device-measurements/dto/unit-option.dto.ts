import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class MeasurementUnitOptionDto {
  @Field(() => ID, { nullable: true })
  public id?: string | null;
  @Field(() => String)
  public unit!: string;
}
