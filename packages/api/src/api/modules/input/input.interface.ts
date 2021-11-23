import { MycodoDeviceMeasurementsEntity } from '@harriot-mycodo/modules/device-measurements/device-measurements.entity';
import { MycodoInputChannelEntity } from '@harriot-mycodo/modules/input-channel/input-channel.entity';
import { MycodoInputEntity } from '@harriot-mycodo/modules/input/input.entity';

export interface MycodoApiInput {
  'input settings': MycodoInputEntity;
  'device measurements': MycodoDeviceMeasurementsEntity[];
  'input channels': MycodoInputChannelEntity[];
}
