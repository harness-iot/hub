import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateNodeInput {
  @Field(() => String, { nullable: true })
  readonly nickname?: string;
  @Field(() => Boolean, { nullable: true })
  readonly is_enabled?: boolean;
}
