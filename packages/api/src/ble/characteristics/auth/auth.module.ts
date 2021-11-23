import { Module } from '@nestjs/common';

import { BleCharAuthService } from './auth.service';

@Module({
  providers: [BleCharAuthService],
  exports: [BleCharAuthService],
})
export class BleCharAuthModule {}
