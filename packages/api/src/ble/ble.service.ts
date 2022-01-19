import bleno from '@abandonware/bleno';
import { Injectable, Logger } from '@nestjs/common';

import { ConfigService } from '../config/config.service';

import { BleCharacteristicsService } from './characteristics/characteristics.service';

type BlenoState =
  | 'poweredOn'
  | 'poweredOff'
  | 'unauthorized'
  | 'unsupported'
  | 'unknown'
  | 'resetting';

@Injectable()
export class BleService {
  private isAdvertising = false;

  constructor(
    private readonly configService: ConfigService,
    private readonly charService: BleCharacteristicsService,
  ) {}

  private async setServices(): Promise<void> {
    const services = new bleno.PrimaryService({
      uuid: this.configService.BLE_SERVICE_UUID,
      characteristics: this.charService.all(),
    });

    return new Promise((resolve, reject) =>
      bleno.setServices([services], (err) => {
        if (err) {
          return reject(err);
        }

        return resolve(null);
      }),
    );
  }

  private async startAdvertising(): Promise<void> {
    return new Promise((resolve, reject) => {
      bleno.startAdvertising(
        this.configService.DEVICE_NAME,
        [this.configService.BLE_SERVICE_UUID],
        (err) => {
          if (err) {
            return reject(err);
          }
          return resolve();
        },
      );
    });
  }

  private async stopAdvertising(): Promise<void> {
    return new Promise((resolve, _reject) =>
      bleno.stopAdvertising(() => {
        return resolve();
      }),
    );
  }

  private onStateChange = async (state: BlenoState) => {
    Logger.log(`BLE State Change: ${state}`, BleService.name);

    if (state !== 'poweredOn' && this.isAdvertising) {
      await this.stopAdvertising();
      return;
    }

    await this.startAdvertising();
    await this.setServices();
    try {
    } catch (err) {
      console.log(err);
    }
  };

  public start(): void {
    bleno.on('stateChange', this.onStateChange);

    bleno.on('advertisingStart', (err) => {
      if (err) {
        Logger.error('BLE advertisingStart error', err);
      }

      this.isAdvertising = true;
      Logger.log('BLE advertisingStart', BleService.name);
    });

    bleno.on('advertisingStartError', (err) => {
      if (err) {
        Logger.error('BLE advertisingStartError error', err);
      }

      Logger.log('BLE advertisingStartError', BleService.name);
    });

    bleno.on('advertisingStop', () => {
      this.isAdvertising = false;
      Logger.log('BLE advertisingStop', BleService.name);
    });

    bleno.on('servicesSet', (err) => {
      if (err) {
        Logger.error('BLE servicesSet error', err);
      }

      Logger.log('BLE servicesSet', BleService.name);
    });

    bleno.on('servicesSetError', (err) => {
      if (err) {
        Logger.error('BLE servicesSetError error', err);
      }

      Logger.log('BLE servicesSetError', BleService.name);
    });

    bleno.on('disconnect', () => {
      Logger.log('BLE disconnect', BleService.name);
    });
  }
}
