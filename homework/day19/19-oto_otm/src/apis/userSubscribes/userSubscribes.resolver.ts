import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserSubscribe } from './entities/usersubscribes.entity';
import { UserSubscribesService } from './userSubscribes.service';


@Resolver()
export class UserSubscribesResolver {
  constructor(
    private readonly userSubscribesService: UserSubscribesService,
  ) {}
  @Query(() => [UserSubscribe])
  fetchUserSubscribes(){
    return this.userSubscribesService.findAll()
  }
  @Query(() => [UserSubscribe])
  fetchUserSubscribesWtihDeleted(){
    return this.userSubscribesService.findAllWithDeleted()
  }
  @Query(() => UserSubscribe)
  fetchUserSubscribe({usersubscribesId}){
    return this.userSubscribesService.find({usersubscribesId})
  }


  @Mutation(() => UserSubscribe)
  createUserSubscribes(
    @Args('subscribeId') subscribeId: string, //
    @Args('userId') userId: string,
  ) {
    return this.userSubscribesService.create({ subscribeId, userId });
  }

  @Mutation(() => Boolean)
  async restoreUserSubscribe(
    @Args('usersubscribesId') usersubscribesId: string, //
  ){
    await this.userSubscribesService.checkIsDeleted({usersubscribesId})
    return this.userSubscribesService.restore({usersubscribesId})
  }

  @Mutation(() => Boolean)
  deleteUserSubscribes(
    @Args("usersubscribesId") usersubscribesId: string, //
  ){
    return this.userSubscribesService.delete({usersubscribesId})
  }
}
