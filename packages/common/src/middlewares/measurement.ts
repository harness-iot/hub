import { FieldMiddleware, MiddlewareContext } from '@nestjs/graphql';

import { NodeMeasurementDto } from '../dto/measurement.dto';
import { getMeasurementByKey, getMeasurementUnitByKey } from '../utils';

export const measurementMiddleware: FieldMiddleware<any, NodeMeasurementDto> =
  async (ctx: MiddlewareContext): Promise<NodeMeasurementDto> => {
    const { measurement_key } = ctx.source;

    const measurement = getMeasurementByKey(measurement_key);

    const unit_options = measurement.units.map((unit_key) =>
      getMeasurementUnitByKey(unit_key),
    );

    return {
      ...measurement,
      unit_options,
    };
  };
