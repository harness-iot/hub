enum WifiScanSignalEnum {
  WEAK = 'weak',
  FAIR = 'fair',
  GOOD = 'good',
  EXCELLENT = 'excellent',
}

export const wifiSignalUtil = (signal: number) => {
  switch (true) {
    case signal > -50:
      return WifiScanSignalEnum.EXCELLENT;
    case signal >= -60 && signal < -50:
      return WifiScanSignalEnum.GOOD;
    case signal >= -70 && signal < -60:
      return WifiScanSignalEnum.FAIR;
    case signal < -70:
      return WifiScanSignalEnum.WEAK;
    default:
      return WifiScanSignalEnum.WEAK;
  }
};
