import fs from 'node:fs';

import { Injectable } from '@nestjs/common';

import { ConfigService } from '@harness-api/config/config.service';

import { DeveloperLogDto } from './dto/log.dto';
import { DeveloperLogLevelEnum } from './enums/log-level.enum';
import { InstanceGetDeveloperLogsInput } from './inputs/get-logs.input';

interface LogFileData {
  original_name: string;
  date: Date;
  increment: number;
}

interface LogFileReduce {
  line_count: number;
  complete: boolean;
  result: DeveloperLogDto[];
}

@Injectable()
export class HubDeveloperRouteService {
  constructor(private readonly configService: ConfigService) {}

  private readFile(file_path: string): Promise<string> {
    return new Promise((resolve, reject) => {
      let contents = '';
      const readableStream = fs.createReadStream(file_path, 'utf8');
      readableStream.on('error', reject);
      readableStream.on('data', (chunk: string) => (contents += chunk));
      readableStream.on('end', () => resolve(contents));
    });
  }

  public async getLogs(
    input: InstanceGetDeveloperLogsInput,
  ): Promise<DeveloperLogDto[]> {
    const logDir = `${this.configService.BASE_DIR}/packages/api/logs`;

    // Look for log files
    const logFileData: LogFileData[] = [];
    fs.readdirSync(logDir).forEach((file) => {
      if (file.startsWith('log_')) {
        const file_name = file.match(/log_(.*).json/).pop();
        const file_parts = file_name.split('.');

        logFileData.push({
          original_name: file,
          date: new Date(file_parts[0]),
          increment: file_parts[1] ? Number(file_parts[1]) : 0,
        });
      }
    });

    // Sort file order (reverse chronological)
    const sortedLogFiles = logFileData.sort((a, b) => {
      // If same date, we sort by incrementing value
      if (Number(a.date) === Number(b.date)) {
        return b.increment - a.increment;
      }

      // Sort by date part only
      return Number(b.date) - Number(a.date);
    });

    const fileResolver = await sortedLogFiles.reduce(
      async (async_acc: Promise<LogFileReduce>, logFile: LogFileData) => {
        const acc = await async_acc;

        if (acc.complete) {
          return acc;
        }

        const content = await this.readFile(
          `${logDir}/${logFile.original_name}`,
        );

        const rows = content.split('\n');

        rows.reverse().forEach((row) => {
          if (!row) {
            return acc;
          }
          // Log levels
          // debug = everything
          // info = everything except debug
          // error = only error

          const parsed_row = JSON.parse(row) as DeveloperLogDto;

          if (input.level === DeveloperLogLevelEnum.DEBUG) {
            acc.line_count++;
            if (acc.line_count > input.line_end) {
              acc.complete = true;
            } else {
              acc.result = [
                ...acc.result,
                { id: acc.line_count, ...parsed_row },
              ];
            }
          }

          if (input.level === DeveloperLogLevelEnum.INFO) {
            if (parsed_row.level === 'info' || parsed_row.level === 'error') {
              acc.line_count++;
              if (acc.line_count > input.line_end) {
                acc.complete = true;
              } else {
                acc.result = [
                  ...acc.result,
                  { id: acc.line_count, ...parsed_row },
                ];
              }
            }
          }

          if (input.level === DeveloperLogLevelEnum.ERROR) {
            if (parsed_row.level === 'error') {
              acc.line_count++;

              if (acc.line_count > input.line_end) {
                acc.complete = true;
              } else {
                acc.result = [
                  ...acc.result,
                  { id: acc.line_count, ...parsed_row },
                ];
              }

              return acc;
            }
          }
        });

        return acc;
      },
      Promise.resolve({ complete: false, line_count: 0, result: [] }),
    );

    return fileResolver.result;
  }
}
