import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { NodeChannelEntityService, RedisService } from '@harriot-hub/common';
import { MQTT_PROVIDER } from '@harriot-mqtt/mqtt.constants';

import { OutputControllerResponseEnum } from './enums/output-controller-response.enum';

@Injectable()
export class OutputControllerService {
  constructor(
    @Inject(MQTT_PROVIDER) private readonly client: ClientProxy,
    protected readonly nodeChannelService: NodeChannelEntityService,
    protected readonly redisService: RedisService,
  ) {}

  public async is_active(node_id: string, channel: number): Promise<boolean> {
    const node = await this.redisService.getActiveOutputNode(node_id, channel);
    return !!node;
  }

  public async is_connected(node_id: string): Promise<boolean> {
    const node = await this.redisService.getIsNodeConnected(node_id);
    return Boolean(Number(node));
  }

  public async activate(
    node_id: string,
    channel: number,
  ): Promise<OutputControllerResponseEnum> {
    const isConnected = await this.is_connected(node_id);

    if (!isConnected) {
      Logger.warn(`Node ${node_id} is not connected. Nothing done.`);
      return OutputControllerResponseEnum.NOT_CONNECTED;
    }

    const isActive = await this.is_active(node_id, channel);

    if (isActive) {
      Logger.warn(`Node ${node_id} is already on. Nothing done.`);
      return OutputControllerResponseEnum.SUCCESS;
    }

    const channelEntity = await this.nodeChannelService.findOne({
      where: { node_id, channel },
    });

    if (!channelEntity) {
      throw Error(
        `Failed to find node channel with node_id:${node_id}, channel:${channel}`,
      );
    }

    // Initially set expiry and then remove once confirm received from node
    // Reason to set before confirm: must be available to controller
    await this.redisService.setActiveOutputNode(node_id, channelEntity, 10);

    const payload = {
      action: {
        type: 'on',
        channel,
      },
    };

    return new Promise((resolve, reject) => {
      this.client.send(`node/${node_id}`, payload).subscribe(async (value) => {
        if (value === 'success') {
          // Remove expiration
          await this.redisService.setActiveOutputNode(node_id, channelEntity);
          return resolve(OutputControllerResponseEnum.SUCCESS);
        }

        return reject('activate failed');
      });
    });
  }

  public async deactivate(
    node_id: string,
    channel: number,
  ): Promise<OutputControllerResponseEnum> {
    const isConnected = await this.is_connected(node_id);

    if (!isConnected) {
      Logger.warn(`Node ${node_id} is not connected. Nothing done.`);
      return OutputControllerResponseEnum.NOT_CONNECTED;
    }

    const isActive = await this.is_active(node_id, channel);

    if (!isActive) {
      Logger.warn(`Node ${node_id} is already off. Nothing done.`);
      return OutputControllerResponseEnum.SUCCESS;
    }

    const payload = {
      action: {
        type: 'off',
        channel,
      },
    };
    return new Promise((resolve, reject) => {
      this.client.send(`node/${node_id}`, payload).subscribe(async (value) => {
        if (value === 'success') {
          await this.redisService.deleteActiveOutputNode(node_id, channel);
          return resolve(OutputControllerResponseEnum.SUCCESS);
        }

        return reject('deactivate failed');
      });
    });
  }
}
