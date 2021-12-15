import { Injectable } from '@nestjs/common';

import { InputControllerResponseEnum } from '@harriot-controller/input/enums/input-controller-response.enum';
import { InputControllerService } from '@harriot-controller/input/input-controller.service';

import { NodeInputActiveStatusEnum } from './input.enum';

@Injectable()
export class NodeInputRouteService {
  constructor(
    protected readonly inputControllerService: InputControllerService,
  ) {}

  public async activate(
    node_id: string,
    status: NodeInputActiveStatusEnum,
  ): Promise<InputControllerResponseEnum> {
    if (status === NodeInputActiveStatusEnum.DEACTIVATE) {
      return this.inputControllerService.deactivate(node_id);
    }

    return this.inputControllerService.activate(node_id);
  }
}
