import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateMeasurementUnitInput {
  @Field(() => ID)
  readonly unique_id!: string;

  @Field(() => String)
  readonly unit: string;
}
