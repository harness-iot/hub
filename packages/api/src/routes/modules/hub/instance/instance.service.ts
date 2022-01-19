import { Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';

import { HubService } from '@harriot-modules/hub/hub.service';
import { RoleService } from '@harriot-modules/role/role.service';
import { UserService } from '@harriot-modules/user/user.service';

interface SetupJwtDecoded {
  user: string;
  secret: string;
}

@Injectable()
export class HubInstanceRouteService {
  constructor(
    protected readonly hubService: HubService,
    protected readonly userService: UserService,
    protected readonly roleService: RoleService,
  ) {}

  public async setupHub(token: string): Promise<boolean> {
    try {
      const hubSecret = await this.hubService.findOne({
        where: { name: 'hub_secret' },
      });

      if (!hubSecret) {
        throw Error('hub secret not found');
      }

      const { secret, user } = jwt.verify(
        token,
        hubSecret.value,
      ) as SetupJwtDecoded;

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
