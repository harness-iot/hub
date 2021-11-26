import { Module } from '@nestjs/common';

import { ClientModule } from '@harriot-controller/client/client.module';

import { NodeController } from './node.controller';
import { NodeService } from './node.service';

@Module({
  imports: [ClientModule],
  controllers: [NodeController],
  providers: [NodeService],
})
export class NodeModule {}
