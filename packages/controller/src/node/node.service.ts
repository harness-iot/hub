import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NodeEntity } from '@harriot-hub/common';

@Injectable()
export class NodeService {
  logger = new Logger(NodeService.name);
  private _connected: string[];

  constructor(
    @InjectRepository(NodeEntity)
    protected readonly repository: Repository<NodeEntity>,
  ) {
    this._connected = [];
  }

  async status(secret: string, payload: string): Promise<void> {
    try {
      const index = this._connected.indexOf(secret);

      switch (payload) {
        case 'offline':
          if (index !== -1) {
            this._connected.splice(index, 1);
          }
          break;
        case 'online':
          if (index === -1) {
            this._connected.push(secret);
          }
          break;
        default:
          throw Error(`Invalid node status payload: ${payload}`);
      }
    } catch (error) {
      this.logger.error(error);
    }
  }

  get connected() {
    return this._connected;
  }
}
