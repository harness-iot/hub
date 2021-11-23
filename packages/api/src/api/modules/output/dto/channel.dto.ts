import { Field, ObjectType } from '@nestjs/graphql';

import { MycodoOutputChannelEntity } from '@harriot-mycodo/modules/output-channel/output-channel.entity';

@ObjectType()
export class MycodoOutputChannelDto extends MycodoOutputChannelEntity {
  @Field(() => String)
  public state: string;
}
