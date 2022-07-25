import {
  Injectable,
  Dependencies,
  ExecutionContext,
  CanActivate,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

import { ExpressContext } from '@harness-api/types/context.interface';

import { AUTH_ROLE_KEY } from './role.decorator';
import { HubInstanceRoleEnum } from './role.enum';

@Injectable()
@Dependencies(Reflector)
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {
    this.reflector = reflector;
  }

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.getAllAndOverride<HubInstanceRoleEnum>(
      AUTH_ROLE_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRole) {
      return true;
    }

    const ctx: ExpressContext =
      GqlExecutionContext.create(context).getContext();

    if (!ctx.auth) {
      return false;
    }

    const role_levels = [
      HubInstanceRoleEnum.OBSERVER,
      HubInstanceRoleEnum.CONTRIBUTOR,
      HubInstanceRoleEnum.MANAGER,
      HubInstanceRoleEnum.ADMIN,
    ];

    const user_role_level = role_levels.indexOf(ctx.auth.role);
    const req_role_level = role_levels.indexOf(requiredRole);

    return user_role_level >= req_role_level;
  }
}
