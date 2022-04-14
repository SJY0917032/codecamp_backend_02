import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscribe } from '../subscribe/entities/subscribe.entity';
import { User } from '../users/entities/user.entity';
import { UserSubscribe } from '../userSubscribes/entities/usersubscribes.entity';
import { Order } from './entities/order.entity';
import { v4 } from 'uuid';
import { CreateOrderInput } from './dto/createOrderInput';
import { UserSubscribesService } from '../userSubscribes/userSubscribes.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Subscribe)
    private readonly subscribeRepository: Repository<Subscribe>,
    @InjectRepository(UserSubscribe)
    private readonly userSubscribeRepository: Repository<UserSubscribe>,
  ) {}

  async create({ impUid, subscribeId, currentUser }) {
    //
    // 1. 유저가 구입을한다.

    // 들어온 정보로 해당 리포지토리로 검색을한다.
    const user = await this.userRepository.findOne({
      id: currentUser.id,
    });
    const subscribe = await this.subscribeRepository.findOne({
      id: subscribeId,
    });

    const userSubs = await this.userSubscribeRepository.save({
      subscribe: subscribe,
      user: user,
    });

    return await this.orderRepository.save({
      impUid: impUid,
      userSubscribe: userSubs,
    });
  }
}

/*
    1. 유저가 구입을한다
    create Order를하면 onetoone으로 걸려있는 유저 구독을만들어준다
    구독상품과 유저아이디를 가져온것을
        
    const createOrder = new Order();
    
    const user = await this.userRepository.findOne({
        id: currentUser.id
    })
        const subscribe = await this.subscribeRepository.findOne({
        id: subscribeId
    })

    const usersubscribeId = v4();

    createOrder.usersubscribe = { 
        id:usersubscribeId,
        subscribe:subscribe,
        user:user
    }

    (구독아이디에는 유저구독테이블이 들어가줘야함)
*/
