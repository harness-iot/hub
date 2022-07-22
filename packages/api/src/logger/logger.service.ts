import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

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
      level: 'debug', // Keep at highest level so parse out what the user wants to see on client
      format: this.JSON_FORMAT,
      transports: [
        new DailyRotateFile({
          filename: `${LoggerService.LOG_DIR_PATH}/log_%DATE%`,
          maxSize: '130k', // 130kb = ~1,000 line json file, start new file
          maxFiles: 3, // ~3000 lines (at 130kb), before overwriting new file
          extension: '.json',
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
