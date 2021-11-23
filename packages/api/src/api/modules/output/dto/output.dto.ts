import { Field, ObjectType } from '@nestjs/graphql';

import { MycodoOutputChannelEntity } from '@harriot-mycodo/modules/output-channel/output-channel.entity';
import { MycodoOutputEntity } from '@harriot-mycodo/modules/output/output.entity';

import { MycodoOutputChannelDto } from './channel.dto';

@ObjectType()
export class MycodoOutputDto {
  @Field(() => MycodoOutputEntity)
  public output_device: MycodoOutputEntity;

  @Field(() => [MycodoOutputChannelDto])
  public output_device_channels: Partial<MycodoOutputChannelDto>[];
}

@ObjectType()
export class MycodoAllOutputsDto {
  @Field(() => [MycodoOutputEntity])
  public output_devices: MycodoOutputEntity[];

  @Field(() => [MycodoOutputChannelEntity])
  public output_channels: MycodoOutputChannelEntity[];
}
