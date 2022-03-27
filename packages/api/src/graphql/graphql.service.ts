import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';

import { AuthRouteService } from '@harriot-routes/auth/auth.service';

import { ConfigService } from '../config/config.service';
import { ExpressContext } from '../types/context.interface';

@Injectable()
export class GraphqlService implements GqlOptionsFactory {
  constructor(
    private readonly config: ConfigService,
    private readonly authService: AuthRouteService,
  ) {}

  createGqlOptions(): GqlModuleOptions {
    return {
      path: 'harriot',
      // introspection: true,
      // cors: {
      //   origin: true,
      //   credentials: true,
      // },
     // debug: this.config.isDev,
      autoSchemaFile: 'schema.gql',
      definitions: {
        outputAs: 'class',
      },
     // playground: true,
      context: async (ctx: ExpressContext) => {
        return {
          ...ctx,
          auth: await this.authService.validate(ctx.req),
        };
      },
    };
  }
}
