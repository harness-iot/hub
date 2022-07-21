import { Field, ObjectType } from '@nestjs/graphql';

import { UserEntity } from '@harriot-hub/common';

import { HubInstanceRoleEnum } from '@harness-api/modules/role/role.enum';

@ObjectType()
export class AuthRouteDto {
  @Field()
  public user: UserEntity;

  @Field(() => HubInstanceRoleEnum)
  public role: HubInstanceRoleEnum;
}
