import { Injectable } from '@nestjs/common';

import { OutputControllerResponseEnum } from '@harriot-controller/output/enums/output-controller-response.enum';
import { OutputControllerService } from '@harriot-controller/output/output-controller.service';

import { OutputUpdateStateInput } from './inputs/update-state.input';
import { NodeOutputStateEnum } from './output.enum';

@Injectable()
export class NodeOutputRouteService {
  constructor(
    protected readonly outputControllerService: OutputControllerService,
  ) {}

  public async updateState(
    node_id: string,
    input: OutputUpdateStateInput,
  ): Promise<OutputControllerResponseEnum> {
    if (input.state === NodeOutputStateEnum.OFF) {
      return this.outputControllerService.deactivate(node_id, input.channel);
    }

    return this.outputControllerService.activate(node_id, input.channel);
  }
}
