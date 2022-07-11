import { Module } from '@nestjs/common';

import { HubModule } from '@harriot-modules/hub/hub.module';

import { NativeNetworkModule } from '@harness-api/native/network/network.module';

import { BleCharNetworkTypeService } from './network-type.service';

@Module({
  imports: [HubModule, NativeNetworkModule],
  providers: [BleCharNetworkTypeService],
  exports: [BleCharNetworkTypeService],
})
export class BleCharNetworkTypeModule {}
