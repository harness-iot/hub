import { registerEnumType } from '@nestjs/graphql';

export enum DeveloperLogLevelEnum {
  DEBUG = 'debug',
  INFO = 'info',
  ERROR = 'error',
}

registerEnumType(DeveloperLogLevelEnum, {
  name: 'DeveloperLogLevelEnum',
});
