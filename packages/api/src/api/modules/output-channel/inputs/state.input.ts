import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class OutputChannelStateInput {
  @Field(() => Int, { nullable: false })
  readonly channel!: number;

  @Field(() => Int, { nullable: true })
  readonly duration?: number;

  @Field(() => Int, { nullable: true })
  readonly duty_cycle?: number;

  @Field(() => Boolean, { nullable: true })
  readonly state?: boolean;

  @Field(() => Int, { nullable: true })
  readonly volume?: number;
}
