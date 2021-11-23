import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ApCredentialsDto {
  @Field(() => String)
  public ip!: string;
  @Field(() => String)
  public ssid!: string;
  @Field(() => String)
  readonly password!: string;
}
