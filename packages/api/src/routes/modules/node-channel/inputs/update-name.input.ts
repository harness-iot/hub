import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateChannelNameInput {
  @Field(() => String, { nullable: false })
  readonly name!: string;
}
