import path from 'path';

import winston from 'winston';

require('winston-daily-rotate-file');

export class Logger {
  private static base(
    type: 'error' | 'warn' | 'info' | 'debug' | 'verbose',
    message: string,
    context?: string | any,
    trace?: string | any,
  ) {
    const LOG_DIR_PATH = path.resolve(__dirname, '../../logs');

    const WINSTON_TIMESTAMP_FORMAT = 'YYYY-MM-DD HH:mm:ss';
    const WINSTON_INFO_FORMAT = winston.format.combine(
      winston.format.label(),
      winston.format.timestamp({ format: WINSTON_TIMESTAMP_FORMAT }),
      winston.format.printf(
        (info: any) =>
          `[${info.timestamp}] ${info.level.toUpperCase()}: ${info.message}`,
      ),
    );

    const winstonLogger = winston.createLogger();

    winstonLogger.configure({
      level: 'debug',
      format: WINSTON_INFO_FORMAT,
      transports: [
        // @ts-ignore
        new winston.transports.DailyRotateFile({
          filename: `${LOG_DIR_PATH}/%DATE%.log`,
          datePattern: 'YYYY-MM-DD',
          zippedArchive: false,
          maxSize: '50m',
          maxFiles: '3650d',
          level: 'debug',
        }),
        new winston.transports.File({
          filename: `${LOG_DIR_PATH}/_error.log`,
          level: 'error',
        }),
      ],
    });

    const nextContext =
      typeof context === 'string' ? context : JSON.stringify(context);
    let result = context ? `[${nextContext}] ${message}` : `[ - ] ${message}`;

    if (trace) {
      const nextTrace =
        typeof trace === 'string' ? trace : JSON.stringify(trace);
      result += `\n\n📍[ERROR-TRACE] ${nextTrace}\n\n`;
    }

    return winstonLogger.log(type, result);
  }

  public log = (message: string, context?: string) =>
    Logger.base('info', message, context);
  public error = (message: string, context?: string, trace?: string) =>
    Logger.base('error', `❌ ${message}`, context, trace);
  public warn = (message: string, context?: string) =>
    Logger.base('warn', `⚠️ ${message}`, context);
  public debug = (message: string, context?: string) =>
    Logger.base('debug', message, context);
  public verbose = (message: string, context?: string) =>
    Logger.base('verbose', message, context);
}
