import { Injectable } from '@nestjs/common';

import { MycodoApiService } from '@harriot-api/mycodo-api/mycodo-api.service';

import { ControllerStatusDto } from './dto/status.dto';
import { ControllerUpdateStatusInput } from './inputs/status.input';

@Injectable()
export class ApiControllerService {
  constructor(protected readonly apiService: MycodoApiService) {}

  public async updateStatus({
    mycodo_id,
    activate,
  }: ControllerUpdateStatusInput): Promise<boolean> {
    try {
      const body = JSON.stringify({
        activate,
      });

      const data = await this.apiService.fetch<string>({
        endpoint: `controllers/${mycodo_id}`,
        method: 'POST',
        body,
      });

      console.log(data);

      return true;
    } catch (err) {
      throw err;
    }
  }

  public async getStatus(mycodo_id: string): Promise<ControllerStatusDto> {
    return this.apiService.fetch<ControllerStatusDto>({
      endpoint: `controllers/${mycodo_id}`,
      method: 'GET',
    });
  }
}
