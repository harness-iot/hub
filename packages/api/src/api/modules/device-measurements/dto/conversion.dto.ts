import { Field, ObjectType } from '@nestjs/graphql';

import { MycodoConversionEntity } from '@harriot-mycodo/modules/conversion/conversion.entity';

import { MeasurementUnitDto } from './measurement-unit.dto';

@ObjectType()
export class ConversionDto extends MycodoConversionEntity {
  @Field(() => MeasurementUnitDto)
  public measurement_detail!: MeasurementUnitDto;
}
