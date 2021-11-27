import { registerEnumType } from '@nestjs/graphql';

export enum ConditionalInitiatorConditionEnum {
  EQUAL = 'equal',
  LESS_THAN = 'less_than',
  MORE_THAN = 'more_than',
  INCLUDES = 'includes',
}

registerEnumType(ConditionalInitiatorConditionEnum, {
  name: 'ConditionalInitiatorConditionEnum',
});
