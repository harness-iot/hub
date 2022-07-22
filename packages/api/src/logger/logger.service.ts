import winston from 'winston';

export class LoggerService {
  private static LOG_DIR_PATH = `${process.env.HOME}/hub/packages/api/logs`;
  private static TIMESTAMP_FORMAT = 'YYYY-MM-DD HH:mm:ss';

  private static CONSOLE_FORMAT = winston.format.combine(
    winston.format.label(),
    winston.format.timestamp({ format: LoggerService.TIMESTAMP_FORMAT }),
    winston.format((info) => {
      info.level = info.level.toUpperCase();
      return info;
    })(),
    winston.format.printf((info: any) => {
      if (info.level === 'ERROR') {
        const trace = info[1]
          ? JSON.stringify(info[1], Object.getOwnPropertyNames(info[1]))
          : '';
        return `${info.timestamp} - ${info.level} [${info[0]}] ❌ ${info.message}\n\n📍[ERROR-TRACE]: ${trace}`;
      }

      if (info.level === 'WARN') {
        return `${info.timestamp} - ${info.level} [${info[0]}] ⚠️  ${info.message}`;
      }

      return `${info.timestamp} - ${info.level} [${info[0]}] ${info.message}`;
    }),
    winston.format.colorize({ all: true }),
  );

  private static JSON_FORMAT = winston.format.combine(
    winston.format.label(),
    winston.format.timestamp({ format: LoggerService.TIMESTAMP_FORMAT }),
    winston.format.printf((info: any) => {
      return JSON.stringify({
        level: info.level,
        timestamp: info.timestamp,
        message: info.message,
        context: info[0],
        trace: info[1]
          ? JSON.stringify(info[1], Object.getOwnPropertyNames(info[1]))
          : undefined,
      });
    }),
  );

  private static base(
    type: 'error' | 'warn' | 'info' | 'debug' | 'verbose',
    message: string,
    context?: string | any,
    trace?: string | any,
  ) {
    const winstonLogger = winston.createLogger();

    winstonLogger.configure({
      level: 'debug',
      format: this.JSON_FORMAT,
      transports: [
        new winston.transports.File({
          filename: `${LoggerService.LOG_DIR_PATH}/debug.json`,
          level: 'debug',
          maxFiles: 1,
          maxsize: 500,
        }),
        new winston.transports.File({
          filename: `${LoggerService.LOG_DIR_PATH}/info.json`,
          level: 'info',
          maxFiles: 1,
          maxsize: 500,
        }),
        new winston.transports.File({
          filename: `${LoggerService.LOG_DIR_PATH}/error.json`,
          level: 'error',
          maxFiles: 1,
          maxsize: 500,
        }),
      ],
    });

    // Log to console if not in production
    if (process.env.NODE_ENV !== 'production') {
      winstonLogger.add(
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'debug' ? 'debug' : 'info',
          format: this.CONSOLE_FORMAT,
        }),
      );
    }

    return winstonLogger.log(type, message, [context, trace]);
  }

  public log = (message: string, context?: string) =>
    LoggerService.base('info', message, context);
  public error = (message: string, context?: string, trace?: string) =>
    LoggerService.base('error', message, context, trace);
  public warn = (message: string, context?: string) =>
    LoggerService.base('warn', message, context);
  public debug = (message: string, context?: string) =>
    LoggerService.base('debug', message, context);
  public verbose = (message: string, context?: string) =>
    LoggerService.base('verbose', message, context);
}
