import { registerEnumType } from '@nestjs/graphql';

export enum ControllerTypeEnum {
  TARGET = 'target',
  CONDITIONAL = 'conditional',
  ACTION = 'action',
}

registerEnumType(ControllerTypeEnum, {
  name: 'ControllerTypeEnum',
});
