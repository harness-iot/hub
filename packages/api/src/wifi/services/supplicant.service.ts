import { exec } from 'child_process';
import { readFile, writeFile } from 'fs';

import { Injectable } from '@nestjs/common';

import { WifiNetwork } from '../wifi.interface';

import { WifiError } from './error';
import { IwlistService } from './iwlist.service';
import {
  NETWORK_SUPPLICANT_REGEX,
  NETWORK_UNENCRYPTED_PASSPHRASE_REGEX,
  NETWORK_EXISTS_REGEX,
} from './regex';

@Injectable()
export class SupplicantService {
  private static filePath = '/etc/wpa_supplicant/wpa_supplicant.conf';
  private static commands = {
    wpaPassphrase: (ssid: string, password: string) =>
      `sudo wpa_passphrase "${ssid}" "${password}"`,
  };

  constructor(private readonly iwlist: IwlistService) {}

  private static formatNetworkObject = (network: string) => {
    return network
      .trim()
      .split('\n')
      .reduce((lines, line, index, arr) => {
        if (index === 0) {
          return line.trim();
        }

        if (arr.length - 1 === index) {
          return `${lines}\n${line.trim()}`;
        }

        return `${lines}\n  ${line.trim()}`;
      }, '');
  };

  private readSupplicantFile(): Promise<string> {
    return new Promise((resolve, reject) =>
      readFile(SupplicantService.filePath, 'utf-8', (err, data) =>
        err ? reject(err) : resolve(data),
      ),
    );
  }

  private async writeSupplicantFile(data: string): Promise<void> {
    return new Promise((resolve, reject) =>
      writeFile(SupplicantService.filePath, data, 'utf-8', (err) =>
        err ? reject(err) : resolve(),
      ),
    );
  }

  /**
   * Make sure network is still available in scan
   * returns scan object or undefined
   */
  private async findNetworkInScan(
    ssid: string,
  ): Promise<WifiNetwork | undefined> {
    const available_networks = await this.iwlist.scan();

    return available_networks.find(
      (n) => n.ssid.toLowerCase().trim() === ssid.toLowerCase().trim(),
    );
  }

  /**
   * Generate network object with encrypted passphrase
   */
  private wpaSupplicant(ssid: string, password: string): Promise<string> {
    return new Promise((resolve, reject) =>
      exec(
        SupplicantService.commands.wpaPassphrase(ssid, password),
        async (error, stdout, stderr) => {
          if (error || stderr) {
            return reject(
              new WifiError('supplicant', error ? error.message : stderr),
            );
          }

          return resolve(stdout);
        },
      ),
    );
  }

  /**
   * Add network object to wpa_supplicant.conf content
   */
  private updateSupplicantFile(content: string, network: string) {
    try {
      // Check if any other networks exist, ignore anything commented out
      const regex = NETWORK_EXISTS_REGEX;
      const match = content.match(regex);

      // If wpa_supplicant.conf already has network(s) listed, add this one at beginning
      if (match) {
        const pre_target = content.slice(0, match.index).trim();
        return `${pre_target}\n\n${network}\n${content.slice(match.index)}`;
      }

      // Add to bottom of file
      return `${content}\n\n${network}`;
    } catch (err) {
      throw new WifiError(
        'supplicant',
        'failed to update wpa_supplicant.conf content',
      );
    }
  }

  /**
   * Add wifi credentials to wpa_supplicant.conf
   */
  public async enable(ssid: string, password: string): Promise<void> {
    if (!ssid || !password) {
      throw new WifiError('supplicant', 'ssid and password required');
    }

    if (password.length < 8 || password.length > 63) {
      throw new WifiError('supplicant', 'Passphrase must be 8..63 characters');
    }

    // check that network is still available
    // Deleted 8/20 - not sure it necessary and multiple attempts
    // results in 'Device or resource busy' error
    // const network_available = await this.findNetworkInScan(ssid);
    // if (!network_available) {
    //     throw new WifiError("supplicant", `${ssid} network not available`);
    // }

    let supplicant_file = await this.readSupplicantFile();

    // check if network is already listed in supplicant.conf
    const network_match = supplicant_file.match(NETWORK_SUPPLICANT_REGEX(ssid));
    if (network_match) {
      // If network exists, lets remove it - rationale below
      // 1. Might exist due to premature wifi config exit by user (no chance to unwind)
      // 2. Not sure why user would be setting up already setup wifi and
      // 3. if they are, they should know the credentials - security measure?
      supplicant_file = supplicant_file.replace(network_match[0], '');
    }

    // Generate network object
    const raw_network_object = await this.wpaSupplicant(ssid, password);

    // Remove unencrypted password
    const network_object = raw_network_object.replace(
      NETWORK_UNENCRYPTED_PASSPHRASE_REGEX,
      '',
    );

    const formatted_network_object = SupplicantService.formatNetworkObject(
      network_object,
    );

    // Add network object to wpa_supplicant.conf content
    const updated_content = this.updateSupplicantFile(
      supplicant_file.trim(),
      formatted_network_object,
    );

    // Update wpa_supplicant.conf file
    return this.writeSupplicantFile(updated_content);
  }

  public async disable(ssid: string): Promise<void> {
    if (!ssid) {
      throw new WifiError('supplicant', 'ssid required');
    }

    const supplicant_file = await this.readSupplicantFile();

    const network_match = supplicant_file.match(NETWORK_SUPPLICANT_REGEX(ssid));

    if (!network_match) {
      return;
    }

    const pre_target = supplicant_file.slice(0, network_match.index);
    const post_target = supplicant_file.slice(
      network_match.index + network_match[0].length,
    );
    // Updated content to refelect removed network
    const updated_content = `${pre_target.trim()}\n\n${post_target.trim()}`;

    // Update wpa_supplicant.conf file
    return this.writeSupplicantFile(updated_content);
  }
}
