import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ControllerStatusDto {
  @Field(() => Boolean)
  public is_active: boolean;
}
