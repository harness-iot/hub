import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateNodeStatusInput {
  @Field(() => Boolean, { nullable: false })
  readonly is_enabled!: boolean;
}
