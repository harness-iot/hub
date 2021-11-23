import { Module } from '@nestjs/common';

import { HarriotConfigModule } from '@harriot-core/modules/config/config.module';
import { NetworkModule } from '@harriot-network/network.module';

import { BleCharHubfiSetupService } from './hubfi-setup.service';

@Module({
  imports: [HarriotConfigModule, NetworkModule],
  providers: [BleCharHubfiSetupService],
  exports: [BleCharHubfiSetupService],
})
export class BleCharHubfiSetupModule {}
