import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { ConfigModule } from '@harriot-config/config.module';
import { AuthRouteModule } from '@harriot-routes/auth/auth.module';
import { RoutesModule } from '@harriot-routes/routes.module';

import { BleModule } from './ble/ble.module';
import { GraphqlService } from './graphql/graphql.service';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    ConfigModule,
    GraphQLModule.forRootAsync({
      useClass: GraphqlService,
      imports: [AuthRouteModule],
    }),
    RedisModule,
    BleModule,
    RoutesModule,
  ],
})
export class AppModule {}
