import { Module } from '@nestjs/common';

import { MycodoApiModule } from '@harriot-api/mycodo-api/mycodo-api.module';
import { MycodoOutputChannelModule } from '@harriot-mycodo/modules/output-channel/output-channel.module';

import { ApiOutputChannelResolver } from './output-channel.resolver';
import { ApiOutputChannelService } from './output-channel.service';

@Module({
  imports: [MycodoOutputChannelModule, MycodoApiModule],
  providers: [ApiOutputChannelService, ApiOutputChannelResolver],
})
export class ApiOutputChannelModule {}
