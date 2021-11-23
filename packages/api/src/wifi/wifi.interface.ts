export interface WifiNetwork {
    ssid: string;
    signal: number;
    quality: number;
    address?: string;
    security?: string;
    mode?: string;
    frequency?: number;
    channel?: number;
    noise?: number;
}