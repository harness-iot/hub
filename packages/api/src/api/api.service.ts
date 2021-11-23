import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import jwt from 'jsonwebtoken';

import { HarriotConfigService } from '@harriot-core/modules/config/config.service';
import { HarriotUserService } from '@harriot-core/modules/user/user.service';

import { ApiAuthDto } from './auth/auth.dto';

interface TokenPayload {
  public_key: string;
  user_id: string;
}

@Injectable()
export class ApiService {
  constructor(
    private readonly configService: HarriotConfigService,
    private readonly userService: HarriotUserService,
  ) {}

  async auth(req: Request): Promise<ApiAuthDto | null> {
    const authHeader = req.header('authorization');

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return null;
    }

    const secret = await this.configService.findOne({
      where: { name: 'instance_secret' },
    });

    if (!secret) {
      return null;
    }

    try {
      const { public_key, user_id } = jwt.verify(
        token,
        secret.value,
      ) as TokenPayload;

      const user = await this.userService.findOne({ where: { user_id } });

      if (!user) {
        return null;
      }

      return { public_key, user };
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
