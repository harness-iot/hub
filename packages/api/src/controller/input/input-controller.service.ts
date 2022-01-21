import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import {
  NodeChannelEntity,
  NodeChannelEntityService,
  RedisService,
} from '@harriot-hub/common';
import { MQTT_PROVIDER } from '@harriot-mqtt/mqtt.constants';

import { InputControllerResponseEnum } from './enums/input-controller-response.enum';

@Injectable()
export class InputControllerService {
  constructor(
    @Inject(MQTT_PROVIDER) private readonly client: ClientProxy,
    protected readonly nodeChannelService: NodeChannelEntityService,
    protected readonly redisService: RedisService,
  ) {}

  public async is_active(node_id: string): Promise<boolean> {
    const node = await this.redisService.getActiveInputNode(node_id);
    return !!node;
  }

  public async is_connected(node_id: string): Promise<boolean> {
    const node = await this.redisService.getIsNodeConnected(node_id);
    return Boolean(Number(node));
  }

  public async activate(node_id: string): Promise<InputControllerResponseEnum> {
    const isConnected = await this.is_connected(node_id);

    if (!isConnected) {
      Logger.warn(`Node ${node_id} is not connected. Nothing done.`);
      return InputControllerResponseEnum.NOT_CONNECTED;
    }

    const isActive = await this.is_active(node_id);

    if (isActive) {
      Logger.warn(`Node ${node_id} is already active. Nothing done.`);
      return InputControllerResponseEnum.SUCCESS;
    }

    const channels = await this.nodeChannelService.find({
      where: { node_id },
      relations: ['conversion'],
    });

    if (channels.length === 0) {
      throw Error(`Failed to find node ${node_id}`);
    }

    // Initially set expiry and then remove once confirm received from node
    // Reason to set before confirm: must be available to controller
    await this.redisService.setActiveInputNode<NodeChannelEntity[]>(
      node_id,
      channels,
      10,
    );

    const enabledMeasurements = channels.reduce(
      (acc: number[], ch) => (ch.is_enabled ? [ch.channel, ...acc] : acc),
      [],
    );

    const payload = {
      action: {
        type: 'activate',
        channels: enabledMeasurements,
      },
    };

    return new Promise((resolve, reject) => {
      this.client.send(`node/${node_id}`, payload).subscribe(async (value) => {
        if (value === 'success') {
          // Remove expiration
          await this.redisService.setActiveInputNode<NodeChannelEntity[]>(
            node_id,
            channels,
          );
          return resolve(InputControllerResponseEnum.SUCCESS);
        }

        return reject('activate failed');
      });
    });
  }

  public async deactivate(
    node_id: string,
  ): Promise<InputControllerResponseEnum> {
    const isConnected = await this.is_connected(node_id);

    if (!isConnected) {
      Logger.warn(`Node ${node_id} is not connected. Nothing done.`);
      return InputControllerResponseEnum.NOT_CONNECTED;
    }

    const isActive = await this.is_active(node_id);

    if (!isActive) {
      Logger.warn(`Node ${node_id} is already deactivated. Nothing done.`);
      return InputControllerResponseEnum.SUCCESS;
    }

    const payload = {
      action: {
        type: 'deactivate',
      },
    };
    return new Promise((resolve, reject) => {
      this.client.send(`node/${node_id}`, payload).subscribe(async (value) => {
        if (value === 'success') {
          await this.redisService.deleteActiveInputNode(node_id);
          return resolve(InputControllerResponseEnum.SUCCESS);
        }

        return reject('deactivate failed');
      });
    });
  }
}
