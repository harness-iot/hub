import { createUnionType, Field, ObjectType } from '@nestjs/graphql';

import { NetworkIp4AddressTypeEnum } from '../enums/input.enum';
import { NetworkTypeEnum } from '../enums/type.enum';

@ObjectType()
class NetworkDetailDto {
  @Field(() => NetworkTypeEnum)
  public type!: NetworkTypeEnum;
  @Field(() => String)
  public ip4_address!: string;
  @Field(() => NetworkIp4AddressTypeEnum)
  public ip4_address_type!: NetworkIp4AddressTypeEnum;
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
