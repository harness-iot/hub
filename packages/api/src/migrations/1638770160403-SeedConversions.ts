import { getRepository, MigrationInterface } from 'typeorm';

import { MeasurementConversionEntity } from '@harriot-hub/common';

import { measurementConversionSeed } from '../seed/measurement-conversion.seed';

export class SeedConversions1638770160403 implements MigrationInterface {
  public async up(): Promise<void> {
    await getRepository(MeasurementConversionEntity).save(
      measurementConversionSeed,
    );
  }

  public async down(): Promise<void> {
    // do nothing
  }
}
