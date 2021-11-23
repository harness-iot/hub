import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { NodeSecret } from '../decorators/secret.decorator';

import { NodeService } from './node.service';

@Controller()
export class NodeController {
  logger = new Logger('NodeController');

  constructor(private readonly nodeService: NodeService) {}

  @EventPattern('status/+')
  nodeStatus(@NodeSecret() secret: string, @Payload() payload: string) {
    return this.nodeService.status(secret, payload);
  }
}
