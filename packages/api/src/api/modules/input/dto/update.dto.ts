import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateInputSettingsDto {
  @Field(() => ID)
  public unique_id!: string;

  @Field(() => Int)
  public period!: number;
}
