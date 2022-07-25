import { Module } from '@nestjs/common';

import { HubModule } from '@harriot-modules/hub/hub.module';
import { UserModule } from '@harriot-modules/user/user.module';

import { HubDeveloperRouteResolver } from './developer.resolver';
import { HubDeveloperRouteService } from './developer.service';

@Module({
  imports: [HubModule, UserModule],
  providers: [HubDeveloperRouteService, HubDeveloperRouteResolver],
})
export class HubDeveloperRouteModule {}
