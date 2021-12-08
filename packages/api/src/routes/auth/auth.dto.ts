import { Field, ObjectType } from '@nestjs/graphql';

import { UserEntity } from '@harriot-hub/common';

@ObjectType()
export class AuthRouteDto {
  @Field()
  public public_key: string;

  @Field()
  public user: UserEntity;
}
