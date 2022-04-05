import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateSubscribeInput } from "./dto/createSubscribeInput";
import { UpdateSubscribeInput } from "./dto/updateSubscribeInput";
import { Subscribe } from "./entities/subscribe.entity";
import { SubscribeService } from "./subscribe.service";

@Resolver()
export class SubscribeResolver{
    constructor(private readonly subscribeService: SubscribeService) {}


    @Query(() => [Subscribe])
    fetchSubscribes(){
        return this.subscribeService.findAll();
    }

    @Query(() => Subscribe)
    fetchSubscribe(
        @Args('subscribeId') subscribeId: string, // 
    ){
        return this.subscribeService.find({ subscribeId })
    }

    @Mutation(() => Subscribe)
    createSubscribe(
        @Args('createSubscribeInput') createSubscribeInput: CreateSubscribeInput, // 
    ) {
        return this.subscribeService.create({createSubscribeInput})
    }


    @Mutation(() => Subscribe)
    async updateSubscribe(
        @Args('subscribeId') subscribeId: string, // 
        @Args('updateSubscribeInput') updateSubscribeInput: UpdateSubscribeInput,
    ) {
        // 현재 판매중인지 먼저 체크한다.
        await this.subscribeService.checkActive({ subscribeId })
        // 판매중이지 않다면 현재 팔고있지않은 구독상품이므로 수정이 불가능하다.
        // 판매중이라면 데이터를 수정하게 해준다.
        return this.subscribeService.update({ subscribeId, updateSubscribeInput })
    }



}