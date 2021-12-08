import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { AuthRouteDto } from './auth.dto';

export const AuthRoute = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthRouteDto | undefined => {
    const context = GqlExecutionContext.create(ctx).getContext();
    return context.auth;
  },
);
