import { MycodoOutputChannelEntity } from '@harriot-mycodo/modules/output-channel/output-channel.entity';
import { MycodoOutputEntity } from '@harriot-mycodo/modules/output/output.entity';

export interface MycodoApiOutput {
  'output device': MycodoOutputEntity;
  'output device channels': MycodoOutputChannelEntity[];
  'output device channel states': { [key: string]: string };
}

export interface MycodoApiAllOutputs {
  'output devices': MycodoOutputEntity[];
  'output channels': MycodoOutputChannelEntity[];
  'output states': { [key: string]: string };
}
