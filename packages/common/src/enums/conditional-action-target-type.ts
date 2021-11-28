import { registerEnumType } from '@nestjs/graphql';

export enum ConditionalActionTargetTypeEnum {
  INPUT = 'input',
  OUTPUT = 'output',
  CONDITIONAL = 'conditional',
}

registerEnumType(ConditionalActionTargetTypeEnum, {
  name: 'ConditionalActionTargetTypeEnum',
});
