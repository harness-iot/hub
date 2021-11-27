import { registerEnumType } from '@nestjs/graphql';

export enum ConditionalActorTypeEnum {
  INPUT = 'input',
  OUTPUT = 'output',
  CONDITIONAL = 'conditional',
}

registerEnumType(ConditionalActorTypeEnum, {
  name: 'ConditionalActorTypeEnum',
});
