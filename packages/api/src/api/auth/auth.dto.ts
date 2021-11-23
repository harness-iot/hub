import { Field, ObjectType } from '@nestjs/graphql';

import { HarriotUserEntity } from '@harriot-core/modules/user/user.entity';

@ObjectType()
export class ApiAuthDto {
  @Field()
  public public_key: string;

  @Field()
  public user: HarriotUserEntity;
}
