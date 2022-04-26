import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateReviewBoard } from "./dto/createReviewBoardInput";
import { SerachReviewBoard } from "./dto/searchReivewBoard";
import { ReviewBoard } from "./entities/reviewboard.entity";
import { ReviewService } from "./reviewBoard.service";





@Resolver()
export class ReviewResolver{
    constructor(
        private readonly reviewService: ReviewService,//
    ){}

    // 검색한 결과값을 담아주는 GraphQL Object
    @Query(() => [SerachReviewBoard])
    fetchReviews(
        @Args("search") search: string,//
        @Args('star') star: number,
    ) {
        return this.reviewService.find({ search, star })
    }



    @Mutation(() => ReviewBoard)
    createReviewBoard(
        @Args('createReviewBoard') createReviewBoard: CreateReviewBoard,//
    ) {
        return this.reviewService.create({createReviewBoard})
    }
}