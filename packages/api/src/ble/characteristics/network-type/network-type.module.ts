import { Module } from '@nestjs/common';

import { HubModule } from '@harriot-modules/hub/hub.module';

import { BleCharNetworkTypeService } from './network-type.service';

@Module({
  imports: [HubModule],
  providers: [BleCharNetworkTypeService],
  exports: [BleCharNetworkTypeService],
})
export class BleCharNetworkTypeModule {}
