import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import {
  ConfigEntity,
  NodeChannelEntity,
  NodeEntity,
  UserEntity,
} from 'common/dist';
import jwt from 'jsonwebtoken';
import { Connection } from 'typeorm';

import { HubService } from '@harriot-modules/hub/hub.service';
import { RoleService } from '@harriot-modules/role/role.service';
import { UserService } from '@harriot-modules/user/user.service';

import { ConfigService } from '@harness-api/config/config.service';

interface SetupJwtDecoded {
  user: string;
  secret: string;
}

@Injectable()
export class HubInstanceRouteService {
  constructor(
    @InjectConnection() private connection: Connection,
    private readonly configService: ConfigService,
    protected readonly hubService: HubService,
    protected readonly userService: UserService,
    protected readonly roleService: RoleService,
  ) {}

  public async setupHub(token: string): Promise<boolean> {
    try {
      const artifact_secret = this.configService.SECRET_KEY;

      const { secret, user } = jwt.verify(
        token,
        artifact_secret,
      ) as SetupJwtDecoded;

      await this.hubService.resetInstanceSecret();
      await this.hubService.setInstanceSecret(secret);

      const role = await this.roleService.findOne({
        where: { name: 'admin' },
      });

      await this.userService.create(user, role);

      return true;
    } catch (error) {
      throw error;
    }
  }

  public async deleteInstance(): Promise<boolean> {
    // To do
    // - check for active controllers
    // - delete influx data

    const queryRunner = this.connection.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      // Delete all instance dependent tables
      await queryRunner.manager.remove(ConfigEntity);
      await queryRunner.manager.remove(UserEntity);
      await queryRunner.manager.remove(NodeEntity);
      await queryRunner.manager.remove(NodeChannelEntity);

      await queryRunner.commitTransaction();
      return true;
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
