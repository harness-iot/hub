import { Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';

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
}
