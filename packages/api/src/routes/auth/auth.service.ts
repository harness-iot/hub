import { Injectable, Logger } from '@nestjs/common';
import { Request } from 'express';
import jwt from 'jsonwebtoken';

import { HubService } from '@harriot-modules/hub/hub.service';
import { UserService } from '@harriot-modules/user/user.service';

import { HubInstanceRoleEnum } from '@harness-api/modules/role/role.enum';

import { AuthRouteDto } from './auth.dto';

interface TokenPayload {
  user_id: string;
  role: HubInstanceRoleEnum;
}

@Injectable()
export class AuthRouteService {
  private readonly logger = new Logger(AuthRouteService.name);

  constructor(
    private readonly hubService: HubService,
    private readonly userService: UserService,
  ) {}

  async validate(req: Request): Promise<AuthRouteDto | null> {
    this.logger.debug('Enter validate');

    const authHeader = req.header('authorization');

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return null;
    }

    const secret = await this.hubService.findOne({
      where: { name: 'instance_secret' },
    });

    if (!secret) {
      return null;
    }

    try {
      const { user_id, role } = jwt.verify(token, secret.value) as TokenPayload;

      const user = await this.userService.findOne({ where: { user_id } });

      if (!user) {
        return null;
      }

      this.logger.debug(`Authorized user: ${user.id} with role: ${role}`);

      return { user, role };
    } catch (error) {
      // console.log(error);
      this.logger.warn('Invalid hub instance token');
      return null;
    } finally {
      this.logger.debug('Exit validate');
    }
  }
}
