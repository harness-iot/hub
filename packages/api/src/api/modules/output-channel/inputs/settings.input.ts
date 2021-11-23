import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class OutputChannelSettingsInput {
  @Field(() => String, { nullable: true })
  readonly name?: string;
}
