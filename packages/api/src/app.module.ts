import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { ConfigModule } from '@harriot-config/config.module';
import { AuthRouteModule } from '@harriot-routes/auth/auth.module';
import { RoutesModule } from '@harriot-routes/routes.module';

import { BleModule } from './ble/ble.module';
import { GraphqlService } from './graphql/graphql.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GraphqlService,
      imports: [AuthRouteModule],
    }),
    BleModule,
    RoutesModule,
  ],
})
export class AppModule {}
