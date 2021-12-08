import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateInputSettingsPeriodInput {
  @Field(() => Int, { nullable: false })
  readonly period!: number;
}
