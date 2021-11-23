import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class ControllerUpdateStatusInput {
  @Field(() => ID)
  readonly mycodo_id!: string;

  @Field(() => Boolean)
  readonly activate!: boolean;
}
