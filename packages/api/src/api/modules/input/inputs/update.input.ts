import { Field, ID, Int, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateInputSettingsInput {
  @Field(() => Int, { nullable: true })
  public period?: number;

  @Field(() => ID, { nullable: true })
  public pre_output_id?: string;

  @Field(() => Int, { nullable: true })
  public pre_output_duration?: number;

  @Field(() => Boolean, { nullable: true })
  public pre_output_during_measure?: boolean;
}
