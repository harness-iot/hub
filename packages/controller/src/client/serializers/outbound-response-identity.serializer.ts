import { Logger } from '@nestjs/common';
import { Serializer, OutgoingResponse } from '@nestjs/microservices';

export class OutboundResponseIdentitySerializer implements Serializer {
  private readonly logger = new Logger('OutboundResponseIdentitySerializer');
  serialize(value: any): OutgoingResponse {
    this.logger.debug(
      `-->> Serializing outbound response: \n${JSON.stringify(value)}`,
    );
    return value;
  }
}
