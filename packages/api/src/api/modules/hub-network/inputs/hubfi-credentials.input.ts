import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class HubfiCredentialsInput {
  @Field(() => String)
  public ssid!: string;

  @Field(() => String)
  public password!: string;
}
