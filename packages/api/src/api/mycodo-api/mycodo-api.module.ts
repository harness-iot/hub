import { Module } from '@nestjs/common';

import { HarriotConfigModule } from '@harriot-core/modules/config/config.module';

import { MycodoApiService } from './mycodo-api.service';

@Module({
  imports: [HarriotConfigModule],
  providers: [MycodoApiService],
  exports: [MycodoApiService],
})
export class MycodoApiModule {}
