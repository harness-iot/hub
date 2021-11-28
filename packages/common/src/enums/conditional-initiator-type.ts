import { registerEnumType } from '@nestjs/graphql';

export enum ConditionalInitiatorTypeEnum {
  INPUT = 'input',
  OUTPUT = 'output',
  CONDITIONAL = 'conditional',
  TIME = 'time',
}

registerEnumType(ConditionalInitiatorTypeEnum, {
  name: 'ConditionalInitiatorTypeEnum',
});
