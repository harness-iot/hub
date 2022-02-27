import { registerEnumType } from '@nestjs/graphql';

export enum TimeAutomationTypeEnum {
  SUNRISE = 'sunrise',
  SUNSET = 'sunset',
  TIME = 'time',
}

registerEnumType(TimeAutomationTypeEnum, {
  name: 'TimeAutomationTypeEnum',
});
