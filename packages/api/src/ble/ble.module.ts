import { Module } from '@nestjs/common';

import { BleService } from './ble.service';
import { BleCharacteristicsModule } from './characteristics/characteristic.module';

@Module({
  imports: [BleCharacteristicsModule],
  providers: [BleService],
})
export class BleModule {}
