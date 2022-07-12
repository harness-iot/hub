import { exec } from 'child_process';

import { Injectable } from '@nestjs/common';

import { NativeError } from '@harness-api/native/error';
import { WifiNetwork } from '@harness-api/native/network/network.interface';

@Injectable()
export class Ubuntu2204NetworkService {
  public async scan(): Promise<WifiNetwork[]> {
    return new Promise((resolve, reject) =>
      exec(
        'nmcli --get-value SSID,SIGNAL,SECURITY device wifi',
        (error, stdout, stderr) => {
          if (error || stderr) {
            return reject(
              new NativeError('scan', error ? error.message : stderr),
            );
          }

          const rows = stdout.split('\n');

          const result = rows.reduce((acc: WifiNetwork[], item) => {
            const row = item.split(':');

            // if req'd wifi components missing, then skip
            if (row.length !== 3) {
              return acc;
            }

            return [
              {
                ssid: row[0],
                signal: parseInt(row[1], 10),
                security: row[2],
              },
              ...acc,
            ];
          }, []);

          return resolve(result);
        },
      ),
    );
  }

  public async get_ip_address(): Promise<string | null> {
    return new Promise((resolve, reject) =>
      exec("hostname -I | awk '{print $1}'", (error, stdout, stderr) => {
        if (error || stderr) {
          return reject(
            new NativeError('get_ip_address', error ? error.message : stderr),
          );
        }

        return resolve(stdout.trim());
      }),
    );
  }

  public async get_active_ssid(): Promise<string | null> {
    return new Promise((resolve, reject) =>
      exec('nmcli -t -f active,ssid dev wifi', (error, stdout, stderr) => {
        if (error || stderr) {
          return reject(
            new NativeError('get_active_ssid', error ? error.message : stderr),
          );
        }

        const result = stdout.split(':');
        return resolve(result[1]);
      }),
    );
  }

  public async connect_to_wifi(
    ssid: string,
    password: string,
  ): Promise<boolean> {
    return new Promise((resolve, reject) =>
      exec(
        `sudo nmcli dev wifi connect ${ssid} password "${password}"`,
        (error, stdout, stderr) => {
          if (error || stderr) {
            return reject(
              new NativeError(
                'connect_to_wifi',
                error ? error.message : stderr,
              ),
            );
          }

          if (stdout.includes('successfully activated')) {
            return true;
          }

          return false;
        },
      ),
    );
  }
}
