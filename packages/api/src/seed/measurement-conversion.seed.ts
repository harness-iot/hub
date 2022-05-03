import { MeasurementConversionEntity } from '@harriot-hub/common';

type ConversionSeed = Partial<MeasurementConversionEntity>;

export const measurementConversionSeed: ConversionSeed[] = [
  // SPEED
  {
    convert_unit_from: 'm_s',
    convert_unit_to: 'mph',
    equation: 'x*2.2369362920544',
  },
  {
    convert_unit_from: 'm_s',
    convert_unit_to: 'kn',
    equation: 'x*1.9438444924406',
  },
  {
    convert_unit_from: 'mph',
    convert_unit_to: 'm_s',
    equation: 'x/2.2369362920544',
  },
  {
    convert_unit_from: 'mph',
    convert_unit_to: 'kn',
    equation: 'x/1.1507794480235',
  },
  {
    convert_unit_from: 'kn',
    convert_unit_to: 'm_s',
    equation: 'x/1.9438444924406',
  },
  {
    convert_unit_from: 'kn',
    convert_unit_to: 'mph',
    equation: 'x*1.1507794480235',
  },
  // ACCELERATION
  {
    convert_unit_from: 'g_force',
    convert_unit_to: 'm_s_s',
    equation: 'x*9.80665',
  },
  {
    convert_unit_from: 'm_s_s',
    convert_unit_to: 'g_force',
    equation: 'x/9.80665',
  },
  // TEMPERATURE
  {
    convert_unit_from: 'C',
    convert_unit_to: 'F',
    equation: 'x*(9/5)+32',
  },
  {
    convert_unit_from: 'C',
    convert_unit_to: 'K',
    equation: 'x+273.15',
  },
  {
    convert_unit_from: 'F',
    convert_unit_to: 'C',
    equation: '(x-32)*5/9',
  },
  {
    convert_unit_from: 'F',
    convert_unit_to: 'K',
    equation: '(x+459.67)*5/9',
  },
  {
    convert_unit_from: 'K',
    convert_unit_to: 'C',
    equation: 'x-273.15',
  },
  {
    convert_unit_from: 'K',
    convert_unit_to: 'F',
    equation: '(x*9/5)−459.67',
  },
  // FREQUENCY
  {
    convert_unit_from: 'Hz',
    convert_unit_to: 'kHz',
    equation: 'x/1000',
  },
  {
    convert_unit_from: 'Hz',
    convert_unit_to: 'MHz',
    equation: 'x/1000000',
  },
  {
    convert_unit_from: 'kHz',
    convert_unit_to: 'Hz',
    equation: 'x*1000',
  },
  {
    convert_unit_from: 'kHz',
    convert_unit_to: 'MHz',
    equation: 'x/1000',
  },
  {
    convert_unit_from: 'MHz',
    convert_unit_to: 'Hz',
    equation: 'x*1000000',
  },
  {
    convert_unit_from: 'MHz',
    convert_unit_to: 'kHz',
    equation: 'x*1000',
  },
  // LENGTH
  {
    convert_unit_from: 'ft',
    convert_unit_to: 'm',
    equation: 'x/3.2808399',
  },
  {
    convert_unit_from: 'm',
    convert_unit_to: 'ft',
    equation: 'x*3.2808399',
  },
  {
    convert_unit_from: 'm',
    convert_unit_to: 'cm',
    equation: 'x*100',
  },
  {
    convert_unit_from: 'm',
    convert_unit_to: 'mm',
    equation: 'x*1000',
  },
  {
    convert_unit_from: 'mm',
    convert_unit_to: 'cm',
    equation: 'x/10',
  },
  {
    convert_unit_from: 'mm',
    convert_unit_to: 'm',
    equation: 'x/1000',
  },
  {
    convert_unit_from: 'cm',
    convert_unit_to: 'mm',
    equation: 'x*10',
  },
  {
    convert_unit_from: 'cm',
    convert_unit_to: 'm',
    equation: 'x/100',
  },
  // DISK SIZE
  {
    convert_unit_from: 'kB',
    convert_unit_to: 'MB',
    equation: 'x/1000',
  },
  {
    convert_unit_from: 'kB',
    convert_unit_to: 'GB',
    equation: 'x/1000000',
  },
  {
    convert_unit_from: 'MB',
    convert_unit_to: 'kB',
    equation: 'x*1000',
  },
  {
    convert_unit_from: 'MB',
    convert_unit_to: 'GB',
    equation: 'x/1000',
  },
  {
    convert_unit_from: 'GB',
    convert_unit_to: 'kB',
    equation: 'x*1000000',
  },
  {
    convert_unit_from: 'GB',
    convert_unit_to: 'MB',
    equation: 'x*1000',
  },
  // CONCENTRATION
  {
    convert_unit_from: 'ppt',
    convert_unit_to: 'ppm',
    equation: 'x*1000',
  },
  {
    convert_unit_from: 'ppt',
    convert_unit_to: 'ppb',
    equation: 'x*1000000',
  },
  {
    convert_unit_from: 'ppm',
    convert_unit_to: 'ppt',
    equation: 'x/1000',
  },
  {
    convert_unit_from: 'ppm',
    convert_unit_to: 'ppb',
    equation: 'x*1000',
  },
  {
    convert_unit_from: 'ppb',
    convert_unit_to: 'ppt',
    equation: 'x/1000000',
  },
  {
    convert_unit_from: 'ppb',
    convert_unit_to: 'ppm',
    equation: 'x/1000',
  },
  {
    convert_unit_from: 'ppt',
    convert_unit_to: 'percent',
    equation: 'x/10',
  },
  {
    convert_unit_from: 'ppm',
    convert_unit_to: 'percent',
    equation: 'x/10000',
  },
  {
    convert_unit_from: 'ppb',
    convert_unit_to: 'percent',
    equation: 'x/10000000',
  },
  {
    convert_unit_from: 'percent',
    convert_unit_to: 'ppt',
    equation: 'x*10',
  },
  {
    convert_unit_from: 'percent',
    convert_unit_to: 'ppm',
    equation: 'x*10000',
  },
  {
    convert_unit_from: 'percent',
    convert_unit_to: 'ppb',
    equation: 'x*10000000',
  },
  //NUMBER
  {
    convert_unit_from: 'percent',
    convert_unit_to: 'decimal',
    equation: 'x/100',
  },
  {
    convert_unit_from: 'decimal',
    convert_unit_to: 'percent',
    equation: 'x*100',
  },
  // PRESSURE
  {
    convert_unit_from: 'Pa',
    convert_unit_to: 'kPa',
    equation: 'x/1000',
  },
  {
    convert_unit_from: 'Pa',
    convert_unit_to: 'hPa',
    equation: 'x/100',
  },
  {
    convert_unit_from: 'hPa',
    convert_unit_to: 'Pa',
    equation: 'x*100',
  },
  {
    convert_unit_from: 'hPa',
    convert_unit_to: 'kPa',
    equation: 'x/10',
  },
  {
    convert_unit_from: 'kPa',
    convert_unit_to: 'Pa',
    equation: 'x*1000',
  },
  {
    convert_unit_from: 'kPa',
    convert_unit_to: 'hPa',
    equation: 'x*10',
  },
  {
    convert_unit_from: 'psi',
    convert_unit_to: 'cm_water',
    equation: 'x*70.306957964239',
  },
  {
    convert_unit_from: 'psi',
    convert_unit_to: 'kPa',
    equation: 'x*6.8947572932',
  },
  {
    convert_unit_from: 'kPa',
    convert_unit_to: 'psi',
    equation: 'x/6.8947572932',
  },
  // RATE - VOLUME
  {
    convert_unit_from: 'l_s',
    convert_unit_to: 'l_min',
    equation: 'x*60',
  },
  {
    convert_unit_from: 'l_s',
    convert_unit_to: 'l_hr',
    equation: 'x*60*60',
  },
  {
    convert_unit_from: 'l_min',
    convert_unit_to: 'l_s',
    equation: 'x/60',
  },
  {
    convert_unit_from: 'l_min',
    convert_unit_to: 'l_hr',
    equation: 'x*60',
  },
  {
    convert_unit_from: 'l_hr',
    convert_unit_to: 'l_s',
    equation: 'x/60/60',
  },
  {
    convert_unit_from: 'l_hr',
    convert_unit_to: 'l_min',
    equation: 'x/60',
  },
  // TIME
  {
    convert_unit_from: 's',
    convert_unit_to: 'minute',
    equation: 'x/60',
  },
  {
    convert_unit_from: 's',
    convert_unit_to: 'h',
    equation: 'x/60/60',
  },
  {
    convert_unit_from: 'minute',
    convert_unit_to: 's',
    equation: 'x*60',
  },
  {
    convert_unit_from: 'minute',
    convert_unit_to: 'h',
    equation: 'x/60',
  },
  {
    convert_unit_from: 'h',
    convert_unit_to: 's',
    equation: 'x*60*60',
  },
  {
    convert_unit_from: 'h',
    convert_unit_to: 'minute',
    equation: 'x*60',
  },
  // VOLT
  {
    convert_unit_from: 'V',
    convert_unit_to: 'mV',
    equation: 'x*1000',
  },
  {
    convert_unit_from: 'mV',
    convert_unit_to: 'V',
    equation: 'x/1000',
  },
  // ELECTRICAL CURRECT
  {
    convert_unit_from: 'A',
    convert_unit_to: 'mA',
    equation: 'x*1000',
  },
  {
    convert_unit_from: 'mA',
    convert_unit_to: 'A',
    equation: 'x/1000',
  },
  // VOLUME
  {
    convert_unit_from: 'l',
    convert_unit_to: 'ml',
    equation: 'x*1000',
  },
  {
    convert_unit_from: 'ml',
    convert_unit_to: 'l',
    equation: 'x/1000',
  },
];
