import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateNodeSettingInput {
  @Field(() => ID)
  readonly id!: string;
  @Field(() => String)
  readonly value!: string;
}
