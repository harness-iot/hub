import { Module } from '@nestjs/common';

import { clientProvider } from '@harriot-controller/client/client.service';

import { SystemController } from './system.controller';
import { SystemService } from './system.service';

@Module({
  controllers: [SystemController],
  providers: [SystemService, clientProvider],
})
export class SystemModule {}
