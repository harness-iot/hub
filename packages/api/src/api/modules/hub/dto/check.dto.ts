import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CheckHubDto {
  @Field(() => ID)
  public node_secret!: string;
  @Field(() => Int)
  readonly is_active!: number;
}
