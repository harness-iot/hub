import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { NodeSecret } from '../decorators/secret.decorator';

import { NodeService } from './node.service';

@Controller()
export class NodeController {
  logger = new Logger('NodeController');

  constructor(private readonly nodeService: NodeService) {}

  @EventPattern('ping')
  async onPing(@Payload() secret: string) {
    return this.nodeService.onPing(secret);
  }

  @EventPattern('status/online/+')
  onOnline(@NodeSecret() secret: string) {
    return this.nodeService.onOnline(secret);
  }

  @EventPattern('status/offline/+')
  onOffline(@NodeSecret() secret: string) {
    return this.nodeService.onOffline(secret);
  }
}
