import { Module } from '@nestjs/common';

import { clientProvider } from '@harriot-controller/client/client.service';
import { NodeEntityModule } from '@harriot-hub/common';

import { SystemController } from './system.controller';
import { SystemService } from './system.service';

@Module({
  imports: [NodeEntityModule],
  controllers: [SystemController],
  providers: [SystemService, clientProvider],
})
export class SystemModule {}
