import { Field, Float, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SerachReviewBoard{
    @Field(() => String)
    userid: string

    @Field(() => String)
    id: string

    @Field(() => Int)
    star: number

    @Field(() => String)
    contents: string

    @Field(() => Float)
    updatedat: number
}