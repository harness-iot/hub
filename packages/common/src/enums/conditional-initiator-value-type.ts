import { registerEnumType } from '@nestjs/graphql';

export enum ConditionalInitiatorValueTypeEnum {
  BOOLEAN = 'boolean',
  INTEGER = 'integer',
  STRING = 'string',
  STRING_ARRAY = 'string_array',
}

registerEnumType(ConditionalInitiatorValueTypeEnum, {
  name: 'ConditionalInitiatorValueTypeEnum',
});
