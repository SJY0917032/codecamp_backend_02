import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType() // class지만 사실은 GraphQL 객체타입이된다.
export class StarBucks {
  @Field(() => String)
  name: string;

  @Field(() => Int) // GraphQL 타입지정 (Number => Int)
  price: number;

  @Field(() => Int)
  kcal: number;

  @Field(() => Int)
  fat: number;

  @Field(() => Int)
  protein: number;

  @Field(() => Int)
  sodium: number;

  @Field(() => Int)
  sugars: number;

  @Field(() => Int)
  caffeine: number;
}
