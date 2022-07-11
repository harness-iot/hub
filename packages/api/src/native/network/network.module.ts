import { Module } from '@nestjs/common';

import { Ubuntu2204NetworkModule } from '../os/ubuntu_22.04/network/network.module';

import { NativeNetworkService } from './network.service';

@Module({
  imports: [Ubuntu2204NetworkModule],
  providers: [NativeNetworkService],
  exports: [NativeNetworkService],
})
export class NativeNetworkModule {}
