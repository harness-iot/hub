import { Module } from '@nestjs/common';

import { WifiModule } from '@harriot-wifi/wifi.module';

import { BleCharTroubleshootService } from './troubleshoot.service';

@Module({
  imports: [WifiModule],
  providers: [BleCharTroubleshootService],
  exports: [BleCharTroubleshootService],
})
export class BleCharTroubleshootModule {}
