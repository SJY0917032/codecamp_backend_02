import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateSubscribeInput {
  @Field(() => String)
  title: string;

  @Field(() => Int)
  year: number

  @Field(() => Int)
  month: number

  @Field(() => Int)
  price: number

  @Field(() => Boolean, {nullable:true})
  isActive: boolean
}
