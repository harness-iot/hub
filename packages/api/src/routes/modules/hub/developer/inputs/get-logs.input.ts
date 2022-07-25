import { Field, InputType, Int } from '@nestjs/graphql';

import { DeveloperLogLevelEnum } from '../enums/log-level.enum';

@InputType()
export class InstanceGetDeveloperLogsInput {
  @Field(() => DeveloperLogLevelEnum)
  public level!: DeveloperLogLevelEnum;

  @Field(() => Int)
  public line_end!: number;
}
