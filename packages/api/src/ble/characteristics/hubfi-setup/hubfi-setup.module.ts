import { Module } from '@nestjs/common';

import { HubModule } from '@harriot-modules/hub/hub.module';
import { NetworkModule } from '@harriot-network/network.module';

import { BleCharHubfiSetupService } from './hubfi-setup.service';

@Module({
  imports: [HubModule, NetworkModule],
  providers: [BleCharHubfiSetupService],
  exports: [BleCharHubfiSetupService],
})
export class BleCharHubfiSetupModule {}
