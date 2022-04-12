import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscribe } from '../subscribe/entities/subscribe.entity';
import { User } from '../users/entities/user.entity';
import { UserSubscribe } from './entities/usersubscribes.entity';
import { UserSubscribesResolver } from './userSubscribes.resolver';
import { UserSubscribesService } from './userSubscribes.service';


@Module({
  imports: [TypeOrmModule.forFeature([UserSubscribe, User, Subscribe])],
  //   controllers: [BoardResolver],
  providers: [UserSubscribesResolver, UserSubscribesService],
})
export class UserSubscribesModule {}
