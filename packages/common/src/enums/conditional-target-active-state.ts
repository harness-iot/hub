import { registerEnumType } from '@nestjs/graphql';

export enum ConditionalTargetActiveStateEnum {
  ACTIVATE = 'activate',
  DEACTIVATE = 'deactivate',
}

registerEnumType(ConditionalTargetActiveStateEnum, {
  name: 'ConditionalTargetActiveStateEnum',
});
