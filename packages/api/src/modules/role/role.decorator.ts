import { SetMetadata } from '@nestjs/common';

import { HubInstanceRoleEnum } from './role.enum';

export const AUTH_ROLE_KEY = 'role';
export const AuthRole = (role: HubInstanceRoleEnum) =>
  SetMetadata(AUTH_ROLE_KEY, role);
