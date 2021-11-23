import { Module } from '@nestjs/common';

import { MycodoApiModule } from '@harriot-api/mycodo-api/mycodo-api.module';

import { ApiOutputResolver } from './output.resolver';
import { ApiOutputService } from './output.service';

@Module({
  imports: [MycodoApiModule],
  providers: [ApiOutputService, ApiOutputResolver],
})
export class ApiOutputModule {}
