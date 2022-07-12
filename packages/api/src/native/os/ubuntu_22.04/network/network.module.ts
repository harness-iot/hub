import { Module } from '@nestjs/common';

import { Ubuntu2204NetworkService } from './network.service';

@Module({
  providers: [Ubuntu2204NetworkService],
  exports: [Ubuntu2204NetworkService],
})
export class Ubuntu2204NetworkModule {}
