import { registerEnumType } from '@nestjs/graphql';

export enum ControllerTypeEnum {
  INPUT = 'input',
  OUTPUT = 'output',
  CONDITIONAL = 'conditional',
}

registerEnumType(ControllerTypeEnum, {
  name: 'ControllerTypeEnum',
});
