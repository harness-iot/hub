interface Measurements {
  [key: string]: {
    name: string;
    units: string[];
  };
}

export const MEASUREMENTS: Measurements = {
  acceleration: {
    name: 'Acceleration',
    units: ['g_force', 'm_s_s'],
  },
  acceleration_x: {
    name: 'Acceleration (X)',
    units: ['g_force', 'm_s_s'],
  },
  acceleration_y: {
    name: 'Acceleration (Y)',
    units: ['g_force', 'm_s_s'],
  },
  acceleration_z: {
    name: 'Acceleration (Z)',
    units: ['g_force', 'm_s_s'],
  },
  adc: {
    name: 'ADC',
    units: ['unitless'],
  },
  altitude: {
    name: 'Altitude',
    units: ['m', 'ft'],
  },
  battery: {
    name: 'Battery',
    units: ['percent', 'decimal'],
  },
  boolean: {
    name: 'Boolean',
    units: ['bool'],
  },
  co2: {
    name: 'CO2',
    units: ['ppm', 'ppb', 'percent'],
  },
  color_red: {
    name: 'Color (Red)',
    units: ['eight_bit_color'],
  },
  color_green: {
    name: 'Color (Green)',
    units: ['eight_bit_color'],
  },
  color_blue: {
    name: 'Color (Blue)',
    units: ['eight_bit_color'],
  },
  color_x: {
    name: 'Color (x)',
    units: ['cie'],
  },
  color_y: {
    name: 'Color (y)',
    units: ['cie'],
  },
  color_Y: {
    name: 'Color (Y)',
    units: ['cie'],
  },
  cpu_load_1m: {
    name: 'CPU Load 1 min',
    units: ['cpu_load'],
  },
  cpu_load_5m: {
    name: 'CPU Load 5 min',
    units: ['cpu_load'],
  },
  cpu_load_15m: {
    name: 'CPU Load 15 min',
    units: ['cpu_load'],
  },
  dewpoint: {
    name: 'Dewpoint',
    units: ['C', 'F', 'K'],
  },
  disk_space: {
    name: 'Disk',
    units: ['MB', 'kB', 'GB'],
  },
  dissolved_oxygen: {
    name: 'Dissolved Oxygen',
    units: ['mg_L'],
  },
  duration_time: {
    name: 'Duration',
    units: ['s', 'minute', 'h'],
  },
  duty_cycle: {
    name: 'Duty Cycle',
    units: ['percent', 'decimal'],
  },
  edge: {
    name: 'GPIO Edge',
    units: ['bool'],
  },
  electrical_conductivity: {
    name: 'Electrical Conductivity',
    units: ['uS_cm'],
  },
  electrical_current: {
    name: 'Electrical Current',
    units: ['A'],
  },
  electrical_potential: {
    name: 'Electrical Potential',
    units: ['V', 'mV'],
  },
  frequency: {
    name: 'Frequency',
    units: ['Hz', 'kHz', 'MHz'],
  },
  gpio_state: {
    name: 'GPIO State',
    units: ['bool'],
  },
  humidity: {
    name: 'Humidity',
    units: ['percent', 'decimal'],
  },
  humidity_ratio: {
    name: 'Humidity Ratio',
    units: ['kg_kg'],
  },
  ion_concentration: {
    name: 'Ion Concentration',
    units: ['pH'],
  },
  length: {
    name: 'Length',
    units: ['ft', 'cm', 'm', 'mm'],
  },
  light: {
    name: 'Light',
    units: ['full', 'ir', 'lux'],
  },
  moisture: {
    name: 'Moisture',
    units: ['unitless'],
  },
  oxidation_reduction_potential: {
    name: 'Oxidation Reduction Potential',
    units: ['mV', 'V'],
  },
  particulate_matter_1_0: {
    name: 'PM1',
    units: ['ug_m3'],
  },
  particulate_matter_2_5: {
    name: 'PM2.5',
    units: ['ug_m3'],
  },
  particulate_matter_10_0: {
    name: 'PM10',
    units: ['ug_m3'],
  },
  pid_p_value: {
    name: 'PID P-Value',
    units: ['pid_value'],
  },
  pid_i_value: {
    name: 'PID I-Value',
    units: ['pid_value'],
  },
  pid_d_value: {
    name: 'PID D-Value',
    units: ['pid_value'],
  },
  pressure: {
    name: 'Pressure',
    units: ['cm_water', 'psi', 'Pa', 'kPa'],
  },
  pulse_width: {
    name: 'Pulse Width',
    units: ['us'],
  },
  radiation_dose_rate: {
    name: 'Radiation Dose Rate',
    units: ['cpm', 'uSv_hr'],
  },
  rate_volume: {
    name: 'Volume Flow Rate',
    units: ['l_hr', 'l_min', 'l_s'],
  },
  resistance: {
    name: 'Resistance',
    units: ['Ohm'],
  },
  revolutions: {
    name: 'Revolutions',
    units: ['rpm'],
  },
  setpoint: {
    name: 'Setpoint',
    units: ['setpoint'],
  },
  setpoint_band_min: {
    name: 'Band Min',
    units: ['setpoint'],
  },
  setpoint_band_max: {
    name: 'Band Max',
    units: ['setpoint'],
  },
  specific_enthalpy: {
    name: 'Specific Enthalpy',
    units: ['kJ_kg'],
  },
  specific_volume: {
    name: 'Specific Volume',
    units: ['m3_kg'],
  },
  temperature: {
    name: 'Temperature',
    units: ['C', 'F', 'K'],
  },
  unitless: {
    name: 'Unitless',
    units: ['none'],
  },
  vapor_pressure_deficit: {
    name: 'Vapor Pressure Deficit',
    units: ['Pa'],
  },
  version: {
    name: 'Version',
    units: ['unitless'],
  },
  voc: {
    name: 'VOC',
    units: ['ppb', 'ppm'],
  },
  volume: {
    name: 'Volume',
    units: ['l', 'ml'],
  },
};

interface MeasurementUnits {
  [key: string]: {
    name: string;
    unit: string;
  };
}

export const MEASUREMENT_UNITS: MeasurementUnits = {
  unitless: {
    name: '',
    unit: '',
  },
  us: {
    name: 'Microsecond',
    unit: 'µs',
  },
  uS_cm: {
    name: 'Microsiemens per centimeter',
    unit: 'μS/cm',
  },
  uSv_hr: {
    name: 'Microsieverts per hour',
    unit: 'μSv/hr',
  },
  A: {
    name: 'Amp',
    unit: 'A',
  },
  bool: {
    name: 'Boolean',
    unit: 'bool',
  },
  C: {
    name: 'Celsius',
    unit: '°C',
  },
  cie: {
    name: 'CIE',
    unit: 'cie',
  },
  cm: {
    name: 'Centimeter',
    unit: 'cm',
  },
  cm_water: {
    name: 'Centimeters of water',
    unit: 'cm_water',
  },
  cpm: {
    name: 'Counts per minute',
    unit: 'cpm',
  },
  cpu_load: {
    name: 'CPU Load',
    unit: 'Proc.',
  },
  decimal: {
    name: 'Decimal',
    unit: '',
  },
  eight_bit_color: {
    name: '8-Bit Color',
    unit: '8-bit',
  },
  F: {
    name: 'Fahrenheit',
    unit: '°F',
  },
  ft: {
    name: 'Foot',
    unit: 'ft',
  },
  full: {
    name: 'Full',
    unit: 'full',
  },
  g_force: {
    name: 'G-Force',
    unit: 'g',
  },
  GB: {
    name: 'Gigabyte',
    unit: 'GB',
  },
  h: {
    name: 'Hour',
    unit: 'h',
  },
  Hz: {
    name: 'Hertz',
    unit: 'Hz',
  },
  ir: {
    name: 'Infrared',
    unit: 'IR',
  },
  K: {
    name: 'Kelvin',
    unit: '°K',
  },
  kB: {
    name: 'Kilobyte',
    unit: 'kB',
  },
  kg_kg: {
    name: 'Kilogram per kilogram',
    unit: 'kg/kg',
  },
  kHz: {
    name: 'Kilohertz',
    unit: 'kHz',
  },
  kJ_kg: {
    name: 'Kilojoule per kilogram',
    unit: 'kJ/kg',
  },
  kPa: {
    name: 'Kilopascal',
    unit: 'kPa',
  },
  l: {
    name: 'Liter',
    unit: 'l',
  },
  l_hr: {
    name: 'Liters per Hour',
    unit: 'l/hr',
  },
  l_min: {
    name: 'Liters per Minute',
    unit: 'l/min',
  },
  l_s: {
    name: 'Liters Per Second',
    unit: 'l/s',
  },
  lux: {
    name: 'Lux',
    unit: 'lx',
  },
  m: {
    name: 'Meter',
    unit: 'm',
  },
  m_s_s: {
    name: 'Meters per second per second',
    unit: 'm/s/s',
  },
  mg_L: {
    name: 'Milligram per Liter',
    unit: 'mg/L',
  },
  minute: {
    name: 'Minute',
    unit: 'min',
  },
  ml: {
    name: 'Milliliter',
    unit: 'ml',
  },
  mm: {
    name: 'Millimeter',
    unit: 'mm',
  },
  mV: {
    name: 'Millivolt',
    unit: 'mV',
  },
  m3_kg: {
    name: 'Cubic meters per kilogram',
    unit: 'm^3/kg',
  },
  MHz: {
    name: 'Megahertz',
    unit: 'MHz',
  },
  MB: {
    name: 'Megabyte',
    unit: 'MB',
  },
  none: {
    name: 'Unitless',
    unit: '',
  },
  Ohm: {
    name: 'Ohm',
    unit: 'Ω',
  },
  Pa: {
    name: 'Pascal',
    unit: 'Pa',
  },
  percent: {
    name: 'Percent',
    unit: '%',
  },
  pH: {
    name: 'Ion Concentration',
    unit: 'pH',
  },
  pid_value: {
    name: 'PID values',
    unit: '',
  },
  ppb: {
    name: 'Parts per billion',
    unit: 'ppb',
  },
  ppm: {
    name: 'Parts per million',
    unit: 'ppm',
  },
  psi: {
    name: 'Pounds per square inch',
    unit: 'psi',
  },
  rpm: {
    name: 'Revolutions per minute',
    unit: 'rpm',
  },
  s: {
    name: 'Second',
    unit: 's',
  },
  setpoint: {
    name: 'Setpoint',
    unit: '',
  },
  ug_m3: {
    name: 'Microgram per cubic meter',
    unit: 'μg/m^3',
  },
  V: {
    name: 'Volt',
    unit: 'V',
  },
};
