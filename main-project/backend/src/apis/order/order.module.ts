import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { iamPortService } from '../iamport/iamport.service';
import { Subscribe } from '../subscribe/entities/subscribe.entity';
import { User } from '../users/entities/user.entity';
import { UserSubscribe } from '../userSubscribes/entities/usersubscribes.entity';
import { Order } from './entities/order.entity';
import { OrderResolver } from './order.resolver';
import { OrderService } from './order.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Order, Subscribe, UserSubscribe])],
  providers: [OrderResolver, OrderService, iamPortService],
})
export class OrderModule {}
