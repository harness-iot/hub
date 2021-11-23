import { MycodoDeviceMeasurementsEntity } from '../device-measurements/device-measurements.entity';
import { MycodoInputChannelEntity } from '../input-channel/input-channel.entity';

import { MycodoInputEntity } from './input.entity';

export interface MycodoApiInput {
  'input settings': MycodoInputEntity;
  'device measurements': MycodoDeviceMeasurementsEntity[];
  'input channels': MycodoInputChannelEntity[];
}
