import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { ApiModule } from '@harriot-api/api.module';
import { ConfigModule } from '@harriot-config/config.module';

import { BleModule } from './ble/ble.module';
import { GraphqlService } from './graphql/graphql.service';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    ConfigModule,
    GraphQLModule.forRootAsync({
      useClass: GraphqlService,
      imports: [ApiModule],
    }),
    RedisModule,
    BleModule,
    ApiModule,
  ],
})
export class AppModule {}
