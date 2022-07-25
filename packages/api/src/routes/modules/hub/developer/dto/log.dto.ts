import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeveloperLogDto {
  @Field(() => Int)
  public id!: number;
  @Field(() => String)
  public level!: string;
  @Field(() => String)
  public timestamp!: string;
  @Field(() => String)
  readonly message!: string;
  @Field(() => String)
  readonly context!: string;
  @Field(() => String, { nullable: true })
  readonly trace?: string;
}
