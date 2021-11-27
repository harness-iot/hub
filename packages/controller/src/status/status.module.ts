import { Module } from '@nestjs/common';

import { ConditionalModule } from '@harriot-controller/conditional/conditional.module';

import { StatusService } from './status.service';

@Module({
  imports: [ConditionalModule],
  providers: [StatusService],
  exports: [StatusService],
})
export class StatusModule {}
