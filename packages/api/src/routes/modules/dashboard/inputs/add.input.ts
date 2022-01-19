import { InputType, Field, ID } from '@nestjs/graphql';

import { ControllerTypeEnum } from '@harriot-hub/common';

@InputType()
export class AddDashboardCardInput {
  @Field(() => ID, { nullable: false })
  readonly controller_id!: string;

  @Field(() => ControllerTypeEnum, { nullable: false })
  readonly controller_type!: ControllerTypeEnum;
}
