import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateStarBucksInput {
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
