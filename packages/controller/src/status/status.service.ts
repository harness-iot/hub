import { Injectable, Logger } from '@nestjs/common';

import { ConditionalService } from '@harriot-controller/conditional/conditional.service';

@Injectable()
export class StatusService {
  logger = new Logger(StatusService.name);

  constructor(protected readonly conditionalService: ConditionalService) {}

  public async bootstrap(): Promise<void> {
    await this.conditionalService.bootstrap();
  }

  public getStatus() {
    return this.conditionalService.activated;
  }
}
