import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateChannelIconInput {
  @Field(() => String, { nullable: true })
  readonly icon?: string | undefined;
}
