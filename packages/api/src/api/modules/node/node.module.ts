import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SqliteModule } from '@harriot-db/sqlite/sqlite.module';
import { NodeEntity } from '@harriot-hub/common';
import { MqttModule } from '@harriot-mqtt/mqtt.module';

import { ApiNodeResolver } from './node.resolver';
import { ApiNodeService } from './node.service';

@Module({
  imports: [SqliteModule, TypeOrmModule.forFeature([NodeEntity]), MqttModule],
  providers: [ApiNodeService, ApiNodeResolver],
  exports: [ApiNodeService],
})
export class ApiNodeModule {}
