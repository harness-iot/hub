import { Module } from '@nestjs/common';

import { NativeNetworkModule } from '@harness-api/native/network/network.module';

import { BleCharAuthService } from './auth.service';

@Module({
  imports: [NativeNetworkModule],
  providers: [BleCharAuthService],
  exports: [BleCharAuthService],
})
export class BleCharAuthModule {}
