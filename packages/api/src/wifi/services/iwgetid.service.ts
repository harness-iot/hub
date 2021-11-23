import { exec } from 'child_process';

import { Injectable } from '@nestjs/common';

import { WifiError } from './error';

@Injectable()
export class IwgetidService {
  private static commands = {
    state: 'iwgetid wlan1 | grep ESSID',
  };

  /**
   * Returns SSID if connected to WiFi
   */
  public async ssid(): Promise<string | null> {
    return new Promise((resolve, reject) =>
      exec(IwgetidService.commands.state, (error, stdout, stderr) => {
        if (error || stderr) {
          return reject(
            new WifiError('iwconfig', error ? error.message : stderr),
          );
        }

        const match = stdout.match(/ESSID\s*[:|=]\s*"([^"]+)"/);

        if (!match) {
          return resolve(null);
        }

        return resolve(match[1]);
      }),
    );
  }
}
