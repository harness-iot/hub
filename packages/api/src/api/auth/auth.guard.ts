import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { ExpressContext } from '@harriot-types/context.interface';

@Injectable()
export class ApiAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx: ExpressContext = GqlExecutionContext.create(
      context,
    ).getContext();

    if (ctx.auth) {
      return true;
    }

    return false;
  }
}
