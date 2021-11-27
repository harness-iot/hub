import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StatusDto {
  @Field(() => Boolean)
  public is_activated!: boolean;
  @Field(() => [String], { defaultValue: [] })
  public native_actions!: string[];
  @Field(() => [String], { defaultValue: [] })
  public errors!: string[];
}
