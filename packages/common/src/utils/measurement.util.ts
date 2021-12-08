import {
  NODE_MEASUREMENTS,
  NodeMeasurement,
  NODE_MEASUREMENT_UNITS,
  NodeMeasurementUnit,
} from '../constants';

export const getMeasurementByKey = (key: string): NodeMeasurement => {
  const measurement = NODE_MEASUREMENTS.find((m) => m.key === key);

  if (!measurement) {
    throw Error(`failed to find measurement by key: ${key}`);
  }

  return measurement;
};

export const getMeasurementUnitByKey = (key: string): NodeMeasurementUnit => {
  const unit = NODE_MEASUREMENT_UNITS.find((u) => u.key === key);

  if (!unit) {
    throw Error(`failed to find measurement unit by key: ${key}`);
  }

  return unit;
};
