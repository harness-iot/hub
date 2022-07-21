import { Module } from '@nestjs/common';

import { OSNetworkModule } from '@harness-api/os/network/network.module';

import { BleCharAuthService } from './auth.service';

@Module({
  imports: [OSNetworkModule],
  providers: [BleCharAuthService],
  exports: [BleCharAuthService],
})
export class BleCharAuthModule {}
