import { exec } from 'child_process';

import { Injectable } from '@nestjs/common';

import { WifiNetwork } from '../wifi.interface';

import { WifiError } from './error';

@Injectable()
export class IwlistService {
  private static commands = {
    scan: 'sudo iwlist wlan1 scan',
  };

  /**
   * Parse security type
   */
  private static securityType(cell: string): string | null {
    switch (true) {
      case /WPA2\s+Version/.test(cell):
        return 'wpa2';
      case /WPA\s+Version/.test(cell):
        return 'wpa';
      case /Encryption key\s*[:|=]\s*on/.test(cell):
        return 'wep';
      case /Encryption key\s*[:|=]\s*off/.test(cell):
        return 'open';
      default:
        return null;
    }
  }

  /**
   * Parses a scanned wireless network cell
   */
  private static parseWlan0(cell: string): WifiNetwork | null {
    let match: RegExpMatchArray | null;
    const scan: WifiNetwork = {
      ssid: '',
      quality: 0,
      signal: 0,
    };

    // Required fields
    if (!(match = cell.match(/ESSID\s*[:|=]\s*"([^"]+)"/))) {
      return null;
    }
    Object.assign(scan, { ssid: match[1] });

    if (!(match = cell.match(/Quality\s*[:|=]\s*([0-9]+)/))) {
      return null;
    }
    Object.assign(scan, { quality: parseInt(match[1], 10) });

    if (!(match = cell.match(/Signal level\s*[:|=]\s*(-?[0-9]+)/))) {
      return null;
    }
    Object.assign(scan, { signal: parseInt(match[1], 10) });

    // Optional fields
    if ((match = cell.match(/Address\s*[:|=]\s*([A-Fa-f0-9:]{17})/))) {
      Object.assign(scan, { address: match[1].toLowerCase() });
    }

    const security = IwlistService.securityType(cell);
    if (security) {
      Object.assign(scan, { security });
    }

    if ((match = cell.match(/Channel\s*([0-9]+)/))) {
      Object.assign(scan, { channel: parseInt(match[1], 10) });
    }

    if ((match = cell.match(/Frequency\s*[:|=]\s*([0-9\.]+)\s*GHz/))) {
      Object.assign(scan, { frequency: parseFloat(match[1]) });
    }

    if ((match = cell.match(/Mode\s*[:|=]\s*([^\s]+)/))) {
      Object.assign(scan, { mode: match[1].toLowerCase() });
    }

    if ((match = cell.match(/Noise level\s*[:|=]\s*(-?[0-9]+)/))) {
      Object.assign(scan, { noise: parseInt(match[1], 10) });
    }

    return scan;
  }

  /**
   * format network cell output
   */
  private static formatScan(cell: string): WifiNetwork[] {
    return cell
      .split(/Cell [0-9]+ -/)
      .reduce((acc: WifiNetwork[], network: string) => {
        const wifi = IwlistService.parseWlan0(network);
        return wifi ? [wifi, ...acc] : acc;
      }, [])
      .sort((a: any, b: any) => b.signal - a.signal);
  }

  /**
   * find available public wifi networks
   */
  public async scan(): Promise<WifiNetwork[]> {
    return new Promise((resolve, reject) =>
      exec(IwlistService.commands.scan, (error, stdout, stderr) => {
        if (error || stderr) {
          return reject(new WifiError('scan', error ? error.message : stderr));
        }

        return resolve(IwlistService.formatScan(stdout));
      }),
    );
  }
}
