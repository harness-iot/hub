import { createUnionType, Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class NetworkWifiDetailDto {
  @Field(() => String)
  public type!: string;
  @Field(() => String)
  public ssid!: string;
  @Field(() => String)
  public ip_address!: string;
  @Field(() => String)
  public ip_address_type!: string;
}

@ObjectType()
export class NetworkWiredDetailDto {
  @Field(() => String)
  public type!: string;
  @Field(() => String)
  public ip_address!: string;
  @Field(() => String)
  public ip_address_type!: string;
}

export const NetworkSettingsDetailsUnion = createUnionType({
  name: 'NetworkSettingsDetailsDto',
  types: () => [NetworkWifiDetailDto, NetworkWiredDetailDto] as const,
  resolveType(value) {
    if (value.ssid) {
      return NetworkWifiDetailDto;
    }

    return NetworkWiredDetailDto;
  },
});
