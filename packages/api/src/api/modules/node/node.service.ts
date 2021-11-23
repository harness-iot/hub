import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-core';
import { Connection } from 'typeorm';

import { MycodoApiService } from '@harriot-api/mycodo-api/mycodo-api.service';
import { HARRIOT_DB } from '@harriot-core/database/database.constants';
import { HarriotNodeEntity } from '@harriot-core/modules/node/node.entity';
import { NodeTypeEnum } from '@harriot-core/modules/node/node.enum';
import { HarriotNodeService } from '@harriot-core/modules/node/node.service';
import { MYCODO_DB } from '@harriot-mycodo/database/database.constants';
import { MycodoInputService } from '@harriot-mycodo/modules/input/input.service';
import { MycodoOutputService } from '@harriot-mycodo/modules/output/output.service';

import { RedisService } from '../../../redis/lib/redis.service';

import { CreateNodeInput } from './inputs/create.input';
import { UpdateNodeInput } from './inputs/update.input';

// 0 = success, 1 = fail
type MycodoApiSetupOutput = [success: 0 | 1, message: string];

@Injectable()
export class ApiNodeService {
  constructor(
    @InjectConnection(HARRIOT_DB) private connection: Connection,
    @InjectConnection(MYCODO_DB) private mycodo_connection: Connection,
    protected readonly nodeService: HarriotNodeService,
    protected readonly redisService: RedisService,
    protected readonly mycodoInputService: MycodoInputService,
    protected readonly mycodoOutputService: MycodoOutputService,
    protected readonly apiService: MycodoApiService,
  ) {}

  public async create(input: CreateNodeInput): Promise<HarriotNodeEntity> {
    const mycodo_queryRunner = this.mycodo_connection.createQueryRunner();
    const queryRunner = this.connection.createQueryRunner();

    try {
      await mycodo_queryRunner.connect();
      await mycodo_queryRunner.startTransaction();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      if (input.type === NodeTypeEnum.INPUT) {
        await this.mycodoInputService.create(input, mycodo_queryRunner);
      } else {
        await this.mycodoOutputService.create(input, mycodo_queryRunner);
      }

      // Delete Node if it already exists - resetting
      const existing_node = await this.nodeService.findOne({
        where: { public_key: input.public_key },
      });
      if (existing_node) {
        await queryRunner.manager.remove(existing_node);
      }

      const node = new HarriotNodeEntity();
      node.model_id = input.model_id;
      node.public_key = input.public_key;
      node.secret_key = input.secret_key;
      node.name = input.model_name;
      node.nickname = input.setup.nickname;
      node.icon = input.setup.icon;
      node.type = input.type;
      node.is_enabled = true;
      const savedNode = await queryRunner.manager.save(node);

      await mycodo_queryRunner.commitTransaction();
      await queryRunner.commitTransaction();

      // Required to Sync output with Mycodo system
      // Note: needs to be after transaction commit or fails
      if (node.type === NodeTypeEnum.OUTPUT) {
        // FYI 'Add' and 'Modify' are treated the same by Mycodo
        const outputSetup = await this.apiService.fetch<{
          response: MycodoApiSetupOutput;
        }>({
          endpoint: `outputs/setup/${input.public_key}/Add`,
          method: 'POST',
        });

        if (!outputSetup.response) {
          throw Error('output setup failed');
        }

        if (outputSetup.response[0] === 1) {
          throw Error(`Output setup failed: ${outputSetup.response[1]}`);
        }
      }

      return savedNode;
    } catch (err) {
      await mycodo_queryRunner.rollbackTransaction();
      await queryRunner.rollbackTransaction();

      if (err instanceof Error) {
        throw new ApolloError(err.message);
      } else {
        throw new ApolloError('internal server error');
      }
    } finally {
      await mycodo_queryRunner.release();
      await queryRunner.release();
    }
  }

  public async find(): Promise<HarriotNodeEntity[]> {
    try {
      const nodes = await this.nodeService.find();
      return nodes;
    } catch (err) {
      Logger.error(`[${ApiNodeService.name}].findAll`, err);
      throw Error(err);
    }
  }

  public async findOneByPublicKey(
    public_key: string,
  ): Promise<HarriotNodeEntity> {
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
  ): Promise<HarriotNodeEntity> {
    try {
      const node = await this.nodeService.findOneOrFail({
        where: { public_key },
      });

      return this.nodeService.save({ ...node, ...update });
    } catch (error) {
      throw error;
    }
  }

  public async findAll(): Promise<HarriotNodeEntity[]> {
    return this.nodeService.find();
  }
}
