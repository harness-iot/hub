import { InputType, Field, Int } from '@nestjs/graphql';

import { NodeOutputStateEnum } from '../output.enum';

@InputType()
export class OutputUpdateStateInput {
  @Field(() => Int, { nullable: false })
  readonly channel!: number;
  @Field(() => NodeOutputStateEnum, { nullable: false })
  readonly state!: NodeOutputStateEnum;
}
