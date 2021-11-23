import {
  ConsoleLogger,
  LoggerService as NestLoggerService,
} from '@nestjs/common';

import { Logger as LoggerUtil } from '../utils/logger.util';

export class LoggerService extends ConsoleLogger implements NestLoggerService {
  private logger: LoggerUtil;

  constructor() {
    super();
    this.logger = new LoggerUtil();
  }

  log(message: string, context?: string) {
    super.log(message, context);
    this.logger.log(message, context);
  }

  error(message: string, trace: string, context?: string) {
    super.error(message, trace, context);
    this.logger.error(message, trace, context);
  }

  warn(message: string, context?: string) {
    super.warn(message, context);
    this.logger.warn(message, context);
  }

  debug(message: string, context?: string) {
    super.debug(message, context);
    this.logger.debug(message, context);
  }

  verbose(message: string, context?: string) {
    super.verbose(message, context);
    this.logger.verbose(message, context);
  }
}
