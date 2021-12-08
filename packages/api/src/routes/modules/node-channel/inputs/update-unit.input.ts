import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateChannelMeasurementUnitInput {
  @Field(() => ID)
  readonly id!: string;

  @Field(() => String)
  readonly unit!: string;
}
