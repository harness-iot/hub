import { Module } from '@nestjs/common';

import { MycodoApiModule } from '@harriot-api/mycodo-api/mycodo-api.module';
import { MycodoInputModule } from '@harriot-mycodo/modules/input/input.module';
import { MycodoUserModule } from '@harriot-mycodo/modules/user/user.module';

import { ApiInputResolver } from './input.resolver';
import { ApiInputService } from './input.service';

@Module({
  imports: [MycodoApiModule, MycodoInputModule, MycodoUserModule],
  providers: [ApiInputService, ApiInputResolver],
})
export class ApiInputModule {}
