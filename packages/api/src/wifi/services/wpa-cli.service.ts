import { exec } from 'child_process';

import { Injectable } from '@nestjs/common';

import { WifiError } from './error';

@Injectable()
export class WpaCliService {
  private static commands = {
    reconfigure: 'wpa_cli -i wlan1 reconfigure',
  };

  /**
   * Reconfigure the interface after any changes are made
   */
  public async reconfigure(): Promise<string> {
    return new Promise((resolve, reject) =>
      exec(WpaCliService.commands.reconfigure, (error, stdout, stderr) => {
        if (error || stderr) {
          return reject(
            new WifiError('wpa-cli', error ? error.message : stderr),
          );
        }

        return resolve(stdout);
      }),
    );
  }
}
