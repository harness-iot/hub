import { Field, ObjectType } from '@nestjs/graphql';

import { MycodoDeviceMeasurementsEntity } from '@harriot-mycodo/modules/device-measurements/device-measurements.entity';

import { MeasurementUnitDto } from './measurement-unit.dto';

@ObjectType()
export class DeviceMeasurementDto extends MycodoDeviceMeasurementsEntity {
  @Field(() => MeasurementUnitDto)
  public measurement_detail!: MeasurementUnitDto;
  @Field(() => MeasurementUnitDto, { nullable: true })
  public conversion_measurement_detail?: MeasurementUnitDto | null;
}
