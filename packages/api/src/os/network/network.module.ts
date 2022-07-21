import { Module } from '@nestjs/common';

import { Ubuntu2204NetworkModule } from '../ports/ubuntu_22.04/network/network.module';

import { OSNetworkService } from './network.service';

@Module({
  imports: [Ubuntu2204NetworkModule],
  providers: [OSNetworkService],
  exports: [OSNetworkService],
})
export class OSNetworkModule {}
