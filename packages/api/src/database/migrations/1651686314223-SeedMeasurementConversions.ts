import { MigrationInterface, QueryRunner } from 'typeorm';

import { MeasurementConversionEntity } from '@harriot-hub/common';

import { measurementConversionSeed } from '../seed/measurement-conversion.seed';

export class SeedMeasurementConversions1651686314223
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save(
      MeasurementConversionEntity,
      measurementConversionSeed,
    );
  }

  public async down(): Promise<void> {
    // Do nothing
  }
}
