import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class NodeStatusDto {
  @Field(() => [String])
  public connected: string[];
  @Field(() => [String])
  public active: string[];
}
