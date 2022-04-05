import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  name: string;
  // 추가할때 subCategory를 추가할수있게
  // subscribes랑 N:M관계
}
