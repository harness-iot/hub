import { InputType, Field, Int, ID } from '@nestjs/graphql';

@InputType()
export class LastMeasurementByDurationInput {
  @Field(() => ID, { nullable: false })
  readonly node_id!: string;
  @Field(() => Int, { nullable: false })
  readonly past_seconds!: number;
}
