import { Field, ObjectType } from '@nestjs/graphql';

import { MycodoDeviceMeasurementsEntity } from '@harriot-mycodo/modules/device-measurements/device-measurements.entity';
import { MycodoInputChannelEntity } from '@harriot-mycodo/modules/input-channel/input-channel.entity';
import { MycodoInputEntity } from '@harriot-mycodo/modules/input/input.entity';

@ObjectType()
export class MycodoInputDto {
  @Field(() => MycodoInputEntity)
  public input_settings: MycodoInputEntity;

  @Field(() => [MycodoDeviceMeasurementsEntity])
  public device_measurements: Partial<MycodoDeviceMeasurementsEntity>[];

  @Field(() => [MycodoInputChannelEntity])
  public input_channels: MycodoInputChannelEntity[];
}
