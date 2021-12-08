import { Field, ObjectType } from '@nestjs/graphql';

import { NodeMeasurementUnitDto } from './measurement-unit.dto';

@ObjectType()
export class NodeMeasurementDto {
  @Field(() => String)
  public key: string;
  @Field(() => String)
  public name: string;
  @Field(() => [NodeMeasurementUnitDto])
  public unit_options: NodeMeasurementUnitDto[];
}
