import { Int,Field, InputType } from "@nestjs/graphql"


@InputType()
export class CreateReviewBoard{
    @Field(() => String)
    userId: string

    @Field(() => Int)
    star: number

    @Field(() => String)
    contents: string
}