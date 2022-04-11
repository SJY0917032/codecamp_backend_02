import { Field, InputType, Int } from '@nestjs/graphql';
import { CreateProductInput } from 'src/apis/products/dto/createProductInput';
import { Product } from 'src/apis/products/entities/product.entity';

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

  @Field(() => [CreateProductInput])
  products: CreateProductInput[]
}
