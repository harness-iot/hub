import { registerEnumType } from '@nestjs/graphql';

export enum OutputControllerResponseEnum {
  NOT_CONNECTED = 'not_connected',
  SUCCESS = 'success',
}

registerEnumType(OutputControllerResponseEnum, {
  name: 'OutputControllerResponseEnum',
});
