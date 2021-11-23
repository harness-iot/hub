import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { ApiAuthDto } from './auth.dto';

export const ApiAuth = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): ApiAuthDto | undefined => {
    const context = GqlExecutionContext.create(ctx).getContext();
    return context.auth;
  },
);
