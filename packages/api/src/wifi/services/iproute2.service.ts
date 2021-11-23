import { exec } from 'child_process';

import { Injectable } from '@nestjs/common';

import { WifiError } from './error';
import { NETWORK_INTERFACE_ADDR } from './regex';

@Injectable()
export class Iproute2Service {
  private static commands = {
    state: "ip addr | grep -E 'eth0|wlan1'",
  };

  /**
   * Get the network IP address, return NULL if not connected
   */
  public async addr(): Promise<string | null> {
    return new Promise((resolve, reject) =>
      exec(Iproute2Service.commands.state, (error, stdout, stderr) => {
        if (error || stderr) {
          return reject(
            new WifiError('iproute2', error ? error.message : stderr),
          );
        }

        const match = stdout.match(NETWORK_INTERFACE_ADDR('wlan1'));

        if (!match) {
          return resolve(null);
        }

        return resolve(match[1]);
      }),
    );
  }
}
