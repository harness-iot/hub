import { createUnionType, Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class NetworkDetailDto {
  @Field(() => String)
  public type!: string;
  @Field(() => String)
  public ip4_address!: string;
  @Field(() => String)
  public ip4_address_type!: string;
  @Field(() => String)
  public ip4_gateway!: string;
  @Field(() => String)
  public interface_name!: string;
}

@ObjectType()
export class NetworkWifiDetailDto extends NetworkDetailDto {
  @Field(() => String)
  public ssid!: string;
}

@ObjectType()
export class NetworkWiredDetailDto extends NetworkDetailDto {}

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
