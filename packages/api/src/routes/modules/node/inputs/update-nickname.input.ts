import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateNodeNicknameInput {
  @Field(() => String, { nullable: false })
  readonly nickname!: string;
}
