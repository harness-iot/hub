import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class NodeStatusDto {
  @Field(() => ID)
  public node_id: string;
  @Field(() => Boolean)
  public connected: boolean;
  @Field(() => Boolean)
  public active: boolean;
}
