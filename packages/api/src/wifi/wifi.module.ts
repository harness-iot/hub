import { Module } from '@nestjs/common';

import { WifiService } from './wifi.service';
import { wifiProviders } from './services';

@Module({
    providers: [WifiService, ...wifiProviders],
    exports: [WifiService]
})
export class WifiModule { }