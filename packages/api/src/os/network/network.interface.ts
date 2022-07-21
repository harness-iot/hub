export interface WifiNetwork {
  ssid: string;
  signal: number;
  security?: string;
  channel?: number;
}
