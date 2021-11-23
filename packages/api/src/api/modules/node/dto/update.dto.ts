import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateNodeDto {
  @Field(() => ID)
  public public_key!: string;
  @Field(() => String)
  readonly nickname!: string;
  @Field(() => Boolean)
  readonly is_enabled!: boolean;
}
