import { Field, ObjectType, Float } from '@nestjs/graphql';

@ObjectType()
export class LastMeasurementsDataDto {
  @Field(() => String)
  public time: string;
  @Field(() => Float)
  public value: number;
}

@ObjectType()
export class LastMeasurementsDto {
  @Field(() => Boolean)
  public loading!: boolean;
  @Field(() => LastMeasurementsDataDto, { nullable: true })
  public data?: LastMeasurementsDataDto | null;
  @Field(() => String, { nullable: true })
  public error?: string | null;
}
