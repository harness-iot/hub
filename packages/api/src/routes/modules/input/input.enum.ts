import { registerEnumType } from '@nestjs/graphql';

export enum NodeInputActiveStatusEnum {
  ACTIVATE = 'activate',
  DEACTIVATE = 'deactivate',
}

registerEnumType(NodeInputActiveStatusEnum, {
  name: 'NodeInputActiveStatusEnum',
});
