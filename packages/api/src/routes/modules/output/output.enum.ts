import { registerEnumType } from '@nestjs/graphql';

export enum NodeOutputStateEnum {
  ON = 'on',
  OFF = 'off',
}

registerEnumType(NodeOutputStateEnum, {
  name: 'NodeOutputStateEnum',
});
