export interface NodeMeasurement {
  key: string;
  name: string;
  units: string[];
}

export const NODE_MEASUREMENTS: NodeMeasurement[] = [
  {
    key: 'acceleration',
    name: 'Acceleration',
    units: ['g_force', 'm_s_s'],
  },
  {
    key: 'acceleration_x',
    name: 'Acceleration (X)',
    units: ['g_force', 'm_s_s'],
  },
  {
    key: 'acceleration_y',
    name: 'Acceleration (Y)',
    units: ['g_force', 'm_s_s'],
  },
  {
    key: 'acceleration_z',
    name: 'Acceleration (Z)',
    units: ['g_force', 'm_s_s'],
  },
  {
    key: 'adc',
    name: 'ADC',
    units: ['unitless'],
  },
  {
    key: 'altitude',
    name: 'Altitude',
    units: ['m', 'ft'],
  },
  {
    key: 'battery',
    name: 'Battery',
    units: ['percent', 'decimal'],
  },
  {
    key: 'boolean',
    name: 'Boolean',
    units: ['bool'],
  },
  {
    key: 'co2',
    name: 'CO2',
    units: ['ppm', 'ppb', 'percent'],
  },
  {
    key: 'color_red',
    name: 'Color (Red)',
    units: ['eight_bit_color'],
  },
  {
    key: 'color_green',
    name: 'Color (Green)',
    units: ['eight_bit_color'],
  },
  {
    key: 'color_blue',
    name: 'Color (Blue)',
    units: ['eight_bit_color'],
  },
  {
    key: 'color_x',
    name: 'Color (x)',
    units: ['cie'],
  },
  {
    key: 'color_y',
    name: 'Color (y)',
    units: ['cie'],
  },
  {
    key: 'color_Y',
    name: 'Color (Y)',
    units: ['cie'],
  },
  {
    key: 'cpu_load_1m',
    name: 'CPU Load 1 min',
    units: ['cpu_load'],
  },
  {
    key: 'cpu_load_5m',
    name: 'CPU Load 5 min',
    units: ['cpu_load'],
  },
  {
    key: 'cpu_load_15m',
    name: 'CPU Load 15 min',
    units: ['cpu_load'],
  },
  {
    key: 'dewpoint',
    name: 'Dewpoint',
    units: ['C', 'F', 'K'],
  },
  {
    key: 'disk_space',
    name: 'Disk',
    units: ['MB', 'kB', 'GB'],
  },
  {
    key: 'dissolved_oxygen',
    name: 'Dissolved Oxygen',
    units: ['mg_L'],
  },
  {
    key: 'duration_time',
    name: 'Duration',
    units: ['s', 'minute', 'h'],
  },
  {
    key: 'duty_cycle',
    name: 'Duty Cycle',
    units: ['percent', 'decimal'],
  },
  {
    key: 'edge',
    name: 'GPIO Edge',
    units: ['bool'],
  },
  {
    key: 'electrical_conductivity',
    name: 'Electrical Conductivity',
    units: ['uS_cm'],
  },
  {
    key: 'electrical_current',
    name: 'Electrical Current',
    units: ['A'],
  },
  {
    key: 'electrical_potential',
    name: 'Electrical Potential',
    units: ['V', 'mV'],
  },
  {
    key: 'frequency',
    name: 'Frequency',
    units: ['Hz', 'kHz', 'MHz'],
  },
  {
    key: 'gpio_state',
    name: 'GPIO State',
    units: ['bool'],
  },
  {
    key: 'humidity',
    name: 'Humidity',
    units: ['percent', 'decimal'],
  },
  {
    key: 'humidity_ratio',
    name: 'Humidity Ratio',
    units: ['kg_kg'],
  },
  {
    key: 'ion_concentration',
    name: 'Ion Concentration',
    units: ['pH'],
  },
  {
    key: 'length',
    name: 'Length',
    units: ['ft', 'cm', 'm', 'mm'],
  },
  {
    key: 'light',
    name: 'Light',
    units: ['full', 'ir', 'lux'],
  },
  {
    key: 'moisture',
    name: 'Moisture',
    units: ['unitless'],
  },
  {
    key: 'oxidation_reduction_potential',
    name: 'Oxidation Reduction Potential',
    units: ['mV', 'V'],
  },
  {
    key: 'particulate_matter_1_0',
    name: 'PM1',
    units: ['ug_m3'],
  },
  {
    key: 'particulate_matter_2_5',
    name: 'PM2.5',
    units: ['ug_m3'],
  },
  {
    key: 'particulate_matter_10_0',
    name: 'PM10',
    units: ['ug_m3'],
  },
  {
    key: 'pid_p_value',
    name: 'PID P-Value',
    units: ['pid_value'],
  },
  {
    key: 'pid_i_value',
    name: 'PID I-Value',
    units: ['pid_value'],
  },
  {
    key: 'pid_d_value',
    name: 'PID D-Value',
    units: ['pid_value'],
  },
  {
    key: 'pressure',
    name: 'Pressure',
    units: ['cm_water', 'psi', 'Pa', 'kPa'],
  },
  {
    key: 'pulse_width',
    name: 'Pulse Width',
    units: ['us'],
  },
  {
    key: 'radiation_dose_rate',
    name: 'Radiation Dose Rate',
    units: ['cpm', 'uSv_hr'],
  },
  {
    key: 'rate_volume',
    name: 'Volume Flow Rate',
    units: ['l_hr', 'l_min', 'l_s'],
  },
  {
    key: 'resistance',
    name: 'Resistance',
    units: ['Ohm'],
  },
  {
    key: 'revolutions',
    name: 'Revolutions',
    units: ['rpm'],
  },
  {
    key: 'setpoint',
    name: 'Setpoint',
    units: ['setpoint'],
  },
  {
    key: 'setpoint_band_min',
    name: 'Band Min',
    units: ['setpoint'],
  },
  {
    key: 'setpoint_band_max',
    name: 'Band Max',
    units: ['setpoint'],
  },
  {
    key: 'specific_enthalpy',
    name: 'Specific Enthalpy',
    units: ['kJ_kg'],
  },
  {
    key: 'specific_volume',
    name: 'Specific Volume',
    units: ['m3_kg'],
  },
  {
    key: 'temperature',
    name: 'Temperature',
    units: ['C', 'F', 'K'],
  },
  {
    key: 'unitless',
    name: 'Unitless',
    units: ['none'],
  },
  {
    key: 'vapor_pressure_deficit',
    name: 'Vapor Pressure Deficit',
    units: ['Pa'],
  },
  {
    key: 'version',
    name: 'Version',
    units: ['unitless'],
  },
  {
    key: 'voc',
    name: 'VOC',
    units: ['ppb', 'ppm'],
  },
  {
    key: 'volume',
    name: 'Volume',
    units: ['l', 'ml'],
  },
];
