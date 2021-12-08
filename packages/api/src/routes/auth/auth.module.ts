import { Module } from '@nestjs/common';

import { HubModule } from '@harriot-modules/hub/hub.module';
import { UserModule } from '@harriot-modules/user/user.module';

import { AuthRouteService } from './auth.service';

@Module({
  imports: [UserModule, HubModule],
  providers: [AuthRouteService],
  exports: [AuthRouteService],
})
export class AuthRouteModule {}
