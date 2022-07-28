import { registerEnumType } from '@nestjs/graphql';

// IMPORTANT - order is important as it's used to determine access level!
// Must match HubInstanceRoleEnum on server
export enum HubInstanceRoleEnum {
  OBSERVER = 'OBSERVER', // read only
  CONTRIBUTOR = 'CONTRIBUTOR', // Limited access
  MANAGER = 'MANAGER', // Can basically do anything admin can do accept delete instance
  ADMIN = 'ADMIN',
}

registerEnumType(HubInstanceRoleEnum, {
  name: 'HubInstanceRoleEnum',
});
