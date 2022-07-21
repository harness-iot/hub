import { Module } from '@nestjs/common';

import { HubModule } from '@harriot-modules/hub/hub.module';

import { OSNetworkModule } from '@harness-api/os/network/network.module';

import { BleCharNetworkTypeService } from './network-type.service';

@Module({
  imports: [HubModule, OSNetworkModule],
  providers: [BleCharNetworkTypeService],
  exports: [BleCharNetworkTypeService],
})
export class BleCharNetworkTypeModule {}
