import { InputType, Field, ID, Int } from '@nestjs/graphql';

@InputType()
export class FindLastMeasurementInput {
  @Field(() => ID)
  readonly mycodo_id!: string;

  @Field(() => String)
  readonly unit!: string;

  @Field(() => Int)
  readonly channel!: number;

  @Field(() => Int)
  readonly past_seconds!: number;
}
