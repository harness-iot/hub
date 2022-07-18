import { exec } from 'child_process';

import { Injectable } from '@nestjs/common';

import { NativeError } from '@harness-api/native/error';
import { WifiNetwork } from '@harness-api/native/network/network.interface';
import { NetworkSettingsDetailsDto } from '@harness-api/routes/modules/hub/network/dto/details.dto';

interface ActiveInterface {
  name: string;
  type: 'wifi' | 'wired';
  type_raw: string;
}

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

  public async get_active_interface(): Promise<ActiveInterface> {
    return new Promise((resolve, reject) =>
      exec('nmcli -t -f NAME,TYPE c show --active', (error, stdout, stderr) => {
        if (error || stderr) {
          return reject(
            new NativeError(
              'get_active_interface',
              error ? error.message : stderr,
            ),
          );
        }

        const parts = stdout.split(':');

        if (parts.length !== 2) {
          return reject(
            new NativeError(
              'get_active_interface',
              'Unexpected result returned',
            ),
          );
        }

        const [name, type] = parts;

        if (!type.includes('wireless') && !type.includes('ethernet')) {
          return reject(
            new NativeError(
              'get_active_interface',
              'Unexpected interface type returned',
            ),
          );
        }

        return resolve({
          name,
          type: type.includes('wireless') ? 'wifi' : 'wired',
          type_raw: type.trim(),
        });
      }),
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

  // 1. Get active interface details
  // 2. Get connection details (type, dynamic/static ip) by interface name
  public async get_network_details(): Promise<NetworkSettingsDetailsDto> {
    const { name, type, type_raw } = await this.get_active_interface();

    let cmd = '';

    if (type === 'wifi') {
      cmd = `nmcli -t -g ipv4.method,IP4.ADDRESS,${type_raw}.ssid con show ${name}`;
    }

    if (type === 'wired') {
      cmd = `nmcli -t -g ipv4.method,IP4.ADDRESS con show ${name}`;
    }

    return new Promise((resolve, reject) =>
      exec(cmd, (error, stdout, stderr) => {
        if (error || stderr) {
          return reject(
            new NativeError(
              'get_network_details',
              error ? error.message : stderr,
            ),
          );
        }

        const results = stdout.split('\n').filter((item) => item);

        if (type === 'wifi') {
          return resolve({
            type,
            ip_address: results[2].split('/')[0],
            ip_address_type: results[0] === 'auto' ? 'dynamic' : 'static',
            ssid: results[1],
          });
        }

        resolve({
          type,
          ip_address: results[1].split('/')[0],
          ip_address_type: results[0] === 'auto' ? 'dynamic' : 'static',
        });
      }),
    );
  }
}
