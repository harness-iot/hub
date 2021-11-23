import { Module } from '@nestjs/common';

import { clientProvider } from './client.service';

@Module({
  providers: [clientProvider],
  exports: [clientProvider],
})
export class ClientModule {}
