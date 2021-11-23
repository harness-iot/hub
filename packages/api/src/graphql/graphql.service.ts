import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';
// import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import { ApiService } from '../api/api.service';
import { ConfigService } from '../config/config.service';
import { ExpressContext } from '../types/context.interface';

@Injectable()
export class GraphqlService implements GqlOptionsFactory {
  constructor(
    private readonly config: ConfigService,
    private readonly apiService: ApiService,
  ) {}

  createGqlOptions(): GqlModuleOptions {
    return {
      path: 'harriot',
      introspection: true,
      cors: {
        origin: true,
        credentials: true,
      },
      debug: this.config.isDev,
      autoSchemaFile: 'schema.gql',
      definitions: {
        outputAs: 'class',
      },
      playground: true,
      // plugins: [
      //   ApolloServerPluginLandingPageGraphQLPlayground({
      //     cdnUrl: 'http://connect.harr_hub/gql-playground',
      //   }),
      // ],
      context: async (ctx: ExpressContext) => {
        return {
          ...ctx,
          auth: await this.apiService.auth(ctx.req),
        };
      },
    };
  }
}
