import crypto from 'crypto';

import { Injectable } from '@nestjs/common';
import * as IORedis from 'ioredis';
import jwt from 'jsonwebtoken';

import { HarriotConfigService } from '@harriot-core/modules/config/config.service';
import { HarriotRoleService } from '@harriot-core/modules/role/role.service';
import { HarriotUserService } from '@harriot-core/modules/user/user.service';
import { MycodoUserService } from '@harriot-mycodo/modules/user/user.service';

// import { RedisService } from '../../../redis/lib/redis.service';

import { CheckHubDto } from './dto/check.dto';

interface SetupJwtDecoded {
  user: string;
  secret: string;
}

@Injectable()
export class ApiHubService {
  constructor(
    // protected readonly redisService: RedisService,
    protected readonly harriotConfigService: HarriotConfigService,
    protected readonly userService: HarriotUserService,
    protected readonly roleService: HarriotRoleService,
    protected readonly mcUserService: MycodoUserService,
  ) {}

  public async setupHub(token: string): Promise<boolean> {
    try {
      const hubSecret = await this.harriotConfigService.findOne({
        where: { name: 'hub_secret' },
      });

      if (!hubSecret) {
        throw Error('hub secret not found');
      }

      const { secret, user } = jwt.verify(
        token,
        hubSecret.value,
      ) as SetupJwtDecoded;

      await this.harriotConfigService.setInstanceSecret(secret);

      // Required to access mycodo api - no easy way to disable
      const apiKey = crypto.randomBytes(128);

      await this.harriotConfigService.setInstanceMycodoApiKey(
        apiKey.toString('base64'),
      );

      await this.mcUserService.createAdmin(secret, apiKey);

      const role = await this.roleService.findOne({
        where: { name: 'admin' },
      });

      await this.userService.create(user, role);

      return true;
    } catch (error) {
      throw error;
    }
  }

  private async getRedisKeys(redis: IORedis.Redis): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const stream = redis.scanStream({ match: 'node:*' });
      const keys: string[] = [];

      stream.on('data', (data: string[]) => {
        keys.push(...data);
      });

      stream.on('error', (err) => {
        reject(err);
      });

      stream.on('end', () => {
        resolve(keys);
      });
    });
  }

  public async check(): Promise<CheckHubDto[]> {
    // const redis = this.redisService.getClient();

    // const keys = await this.getRedisKeys(redis);

    // if (keys.length === 0) {
    //   return [];
    // }

    // const values = await redis.mget(keys);

    // return keys.reduce((acc: CheckHubDto[], key, index) => {
    //   const node_secret = key.split(':')[1];
    //   return [...acc, { node_secret, is_active: parseInt(values[index], 10) }];
    // }, []);

    return [];
  }
}
