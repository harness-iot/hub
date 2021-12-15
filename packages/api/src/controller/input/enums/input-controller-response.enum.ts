import { registerEnumType } from '@nestjs/graphql';

export enum InputControllerResponseEnum {
  NOT_CONNECTED = 'not_connected',
  SUCCESS = 'success',
}

registerEnumType(InputControllerResponseEnum, {
  name: 'InputControllerResponseEnum',
});
