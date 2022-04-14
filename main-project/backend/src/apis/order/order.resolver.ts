import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.parm';
import { Order } from './entities/order.entity';
import { OrderService } from './order.service';

@Resolver()
export class OrderResolver {
  constructor(
    private readonly orderService: OrderService, //
  ) {}

  @Mutation(() => Order)
  @UseGuards(GqlAuthAccessGuard)
  async createOrder(
    @Args('impUid') impUid: string,
    @Args('subscribeId')
    subscribeId: string,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    //
    return await this.orderService.create({ impUid, subscribeId, currentUser });
  }
}
