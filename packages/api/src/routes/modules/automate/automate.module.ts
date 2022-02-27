import { Module } from '@nestjs/common';

import { InputControllerModule } from '@harriot-controller/input/input-controller.module';
import { OutputControllerModule } from '@harriot-controller/output/output-controller.module';

import { AutomateRouteResolver } from './automate.resolver';
import { AutomateRouteTimerService } from './service/automate-timer.service';

@Module({
  imports: [InputControllerModule, OutputControllerModule],
  providers: [AutomateRouteTimerService, AutomateRouteResolver],
})
export class AutomateRouteModule {}
