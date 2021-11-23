import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const NodeSecret = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const { args } = ctx.getArgByIndex(1);
    const topic = args[0];
    const components = topic.split('/');
    return components[components.length - 1];
  },
);
