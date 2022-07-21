import { registerEnumType } from '@nestjs/graphql';

export enum HubInstanceRoleEnum {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER', // Can basically do anything admin can do accept delete instance
  CONTRIBUTOR = 'CONTRIBUTOR', // Limited access
  OBSERVER = 'OBSERVER', // read only
}

registerEnumType(HubInstanceRoleEnum, {
  name: 'HubInstanceRoleEnum',
});
