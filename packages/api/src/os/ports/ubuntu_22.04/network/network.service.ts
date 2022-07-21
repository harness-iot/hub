import { exec } from 'child_process';
import fs from 'node:fs';

import { Injectable } from '@nestjs/common';
import { Address4 } from 'ip-address';
import YAML from 'yaml';

import { NativeError } from '@harness-api/os/error';
import { WifiNetwork } from '@harness-api/os/network/network.interface';
import { NetworkSettingsDetailsUnion } from '@harness-api/routes/modules/hub/network/dto/details.dto';
import { NetworkIp4AddressTypeEnum } from '@harness-api/routes/modules/hub/network/enums/input.enum';
import { NetworkTypeEnum } from '@harness-api/routes/modules/hub/network/enums/type.enum';

interface ActiveInterface {
  name: string;
  type: 'wifi' | 'wired';
  type_raw: string;
}

@Injectable()
export class Ubuntu2204NetworkService {
  private async apply(): Promise<boolean> {
    return new Promise((resolve, reject) =>
      exec('sudo netplan apply', (error, stdout, stderr) => {
        if (error || stderr) {
          return reject(
            new NativeError('apply', error ? error.message : stderr),
          );
        }

        // To do: catch when this fails
        console.log('NETPLAN APPLY: ', stdout);

        return resolve(true);
      }),
    );
  }

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
            return resolve(true);
          }

          return resolve(false);
        },
      ),
    );
  }

  // 1. Get active interface details
  // 2. Get connection details (type, dynamic/static ip) by interface name
  public async get_network_details(): Promise<
    typeof NetworkSettingsDetailsUnion
  > {
    const { name, type, type_raw } = await this.get_active_interface();

    let cmd = '';

    if (type === 'wifi') {
      cmd = `nmcli -t -g ipv4.method,IP4.ADDRESS,IP4.GATEWAY,${type_raw}.ssid,connection.interface-name con show ${name}`;
    }

    if (type === 'wired') {
      cmd = `nmcli -t -g ipv4.method,IP4.ADDRESS,IP4.GATEWAY,connection.interface-name con show ${name}`;
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
            type: NetworkTypeEnum.WIFI,
            ip4_address: results[2].split('/')[0],
            ip4_address_type:
              results[0] === 'auto'
                ? NetworkIp4AddressTypeEnum.DYNAMIC
                : NetworkIp4AddressTypeEnum.STATIC,
            ip4_gateway: '',
            ssid: results[1],
            interface_name: 'to-do',
          });
        }

        resolve({
          type: NetworkTypeEnum.WIRED,
          ip4_address: results[2].split('/')[0],
          ip4_address_type:
            results[0] === 'auto'
              ? NetworkIp4AddressTypeEnum.DYNAMIC
              : NetworkIp4AddressTypeEnum.STATIC,
          ip4_gateway: results[3],
          interface_name: results[1],
        });
      }),
    );
  }

  public async set_ip_address_static(
    static_ip: string,
  ): Promise<typeof NetworkSettingsDetailsUnion> {
    try {
      // First validate IP address
      new Address4(static_ip);
    } catch (error) {
      throw error;
    }

    const network = await this.get_network_details();

    if (network.ip4_address_type === NetworkIp4AddressTypeEnum.STATIC) {
      return network;
    }

    const original_file = fs.readFileSync(
      '/etc/netplan/network-config.yaml',
      'utf8',
    );
    const yamld = YAML.parse(original_file);

    const network_type = network.type === 'wifi' ? 'wifis' : 'ethernets';

    Object.assign(yamld, {
      network: {
        ...yamld.network,
        [network_type]: {
          [network.interface_name]: {
            dhcp4: false,
            addresses: [`${static_ip}/24`],
            routes: [{ to: 'default', via: network.ip4_gateway }],
            nameservers: {
              addresses: ['8.8.8.8', '8.8.4.4'],
            },
          },
        },
      },
    });

    const doc = new YAML.Document(yamld);

    try {
      fs.writeFileSync('/etc/netplan/network-config.yaml', String(doc), {
        flag: 'w',
      });

      await this.apply();

      Object.assign(network, {
        ip4_address_type: NetworkIp4AddressTypeEnum.STATIC,
      });
      return network;
    } catch (error) {
      console.log('set_ip_address_static error: ', error);
      // If new config fails, revert back
      fs.writeFileSync('/etc/netplan/network-config.yaml', original_file, {
        flag: 'w',
      });

      await this.apply();
      return network;
    }
  }

  public async set_ip_address_dynamic(): Promise<
    typeof NetworkSettingsDetailsUnion
  > {
    const network = await this.get_network_details();

    if (network.ip4_address_type === NetworkIp4AddressTypeEnum.DYNAMIC) {
      return network;
    }

    const original_file = fs.readFileSync(
      '/etc/netplan/network-config.yaml',
      'utf8',
    );
    const yamld = YAML.parse(original_file);

    const network_type = network.type === 'wifi' ? 'wifis' : 'ethernets';

    Object.assign(yamld, {
      network: {
        ...yamld.network,
        [network_type]: {
          [network.interface_name]: {
            dhcp4: true,
          },
        },
      },
    });

    const doc = new YAML.Document(yamld);

    try {
      fs.writeFileSync('/etc/netplan/network-config.yaml', String(doc), {
        flag: 'w',
      });

      await this.apply();
      Object.assign(network, {
        ip4_address_type: NetworkIp4AddressTypeEnum.DYNAMIC,
      });
      return network;
    } catch (error) {
      console.log('set_ip_address_dynamic error: ', error);
      // If new config fails, revert back
      fs.writeFileSync('/etc/netplan/network-config.yaml', original_file, {
        flag: 'w',
      });

      await this.apply();
      return network;
    }
  }
}
