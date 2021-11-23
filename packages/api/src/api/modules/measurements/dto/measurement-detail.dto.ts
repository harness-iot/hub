import { Field, ObjectType } from '@nestjs/graphql';

import { MeasurementUnitDetailDto } from './unit-detail.dto';

@ObjectType()
export class MeasurementUnitDetailWithKeyDto extends MeasurementUnitDetailDto {
  @Field(() => String)
  public key: string;
}

@ObjectType()
export class MeasurementDetailDto {
  @Field(() => String)
  public name: string;
  @Field(() => [MeasurementUnitDetailWithKeyDto])
  public units: MeasurementUnitDetailWithKeyDto[];
}
