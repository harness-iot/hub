import { Module } from '@nestjs/common';

import { MycodoApiModule } from '@harriot-api/mycodo-api/mycodo-api.module';

import { ApiControllerResolver } from './controller.resolver';
import { ApiControllerService } from './controller.service';

@Module({
  imports: [MycodoApiModule],
  providers: [ApiControllerService, ApiControllerResolver],
  exports: [ApiControllerService],
})
export class ApiControllerModule {}
