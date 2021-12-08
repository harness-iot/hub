import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectConnection } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-core';
import { Observable } from 'rxjs';
import { Connection } from 'typeorm';

import { MycodoApiService } from '@harriot-api/mycodo-api/mycodo-api.service';
import { HARRIOT_DB } from '@harriot-core/database/database.constants';
import { HarriotNodeService } from '@harriot-core/modules/node/node.service';
import { NodeEntity, NodeTypeEnum } from '@harriot-hub/common';
import { MQTT_PROVIDER } from '@harriot-mqtt/mqtt.constants';
import { MYCODO_DB } from '@harriot-mycodo/database/database.constants';
import { MycodoInputService } from '@harriot-mycodo/modules/input/input.service';
import { MycodoOutputService } from '@harriot-mycodo/modules/output/output.service';

// import { RedisService } from '../../../redis/lib/redis.service';

import { CreateNodeInput } from './inputs/create.input';
import { UpdateNodeInput } from './inputs/update.input';

@Injectable()
export class ApiNodeService {
  constructor(
    @InjectConnection(HARRIOT_DB) private connection: Connection,
    @Inject(MQTT_PROVIDER) private readonly client: ClientProxy,
    protected readonly nodeService: HarriotNodeService,
  ) {}

  public async create(input: CreateNodeInput): Promise<NodeEntity> {
    const queryRunner = this.connection.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      // Delete Node if it already exists - resetting
      const existing_node = await this.nodeService.findOne({
        where: { public_key: input.public_key },
      });
      if (existing_node) {
        await queryRunner.manager.remove(existing_node);
      }

      const node = new NodeEntity();
      node.public_key = input.public_key;
      node.secret_key = input.secret_key;
      node.name = input.model_name;
      node.nickname = input.setup.nickname;
      node.icon = input.setup.icon;
      node.type = input.type;
      node.is_enabled = true;
      const savedNode = await queryRunner.manager.save(node);

      await queryRunner.commitTransaction();

      return savedNode;
    } catch (err) {
      await queryRunner.rollbackTransaction();

      if (err instanceof Error) {
        throw new ApolloError(err.message);
      } else {
        throw new ApolloError('internal server error');
      }
    } finally {
      await queryRunner.release();
    }
  }

  public async find(): Promise<NodeEntity[]> {
    try {
      const nodes = await this.nodeService.find();
      return nodes;
    } catch (err) {
      Logger.error(`[${ApiNodeService.name}].findAll`, err);
      throw Error(err);
    }
  }

  public async findOneByPublicKey(public_key: string): Promise<NodeEntity> {
    try {
      const node = await this.nodeService.findOne({ where: { public_key } });
      return node;
    } catch (err) {
      Logger.error(`[${ApiNodeService.name}].findAll`, err);
      throw Error(err);
    }
  }

  public async update(
    public_key: string,
    update: UpdateNodeInput,
  ): Promise<NodeEntity> {
    try {
      const node = await this.nodeService.findOneOrFail({
        where: { public_key },
      });

      return this.nodeService.save({ ...node, ...update });
    } catch (error) {
      throw error;
    }
  }

  public async findAll(): Promise<NodeEntity[]> {
    return this.nodeService.find();
  }

  public testFindConnected(): Observable<string[]> {
    return this.client.send('connected_nodes', {});
  }
}
