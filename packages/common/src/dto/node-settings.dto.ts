import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class NodeSettingsFieldDto {
  @Field(() => ID)
  public id!: string;

  @Field(() => String)
  public key!: string;

  @Field(() => String)
  public value!: string;
}
