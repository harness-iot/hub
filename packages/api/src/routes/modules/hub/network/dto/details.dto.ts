import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class NetworkSettingsDetailsDto {
  @Field(() => String)
  public type!: string;
  @Field(() => String, { nullable: true })
  public ssid?: string | null;
  @Field(() => String)
  public ip_address!: string;
  @Field(() => String)
  public ip_address_type!: string;
}
