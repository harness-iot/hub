import { Module } from '@nestjs/common';

import { HarriotConfigModule } from '@harriot-core/modules/config/config.module';

import { BleCharNetworkTypeService } from './network-type.service';

@Module({
  imports: [HarriotConfigModule],
  providers: [BleCharNetworkTypeService],
  exports: [BleCharNetworkTypeService],
})
export class BleCharNetworkTypeModule {}
