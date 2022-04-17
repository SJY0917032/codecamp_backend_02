import {
  Injectable,
  ConflictException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { iamPortService } from '../iamport/iamport.service';
import { Subscribe } from '../subscribe/entities/subscribe.entity';
import { User } from '../users/entities/user.entity';
import { UserSubscribe } from '../userSubscribes/entities/usersubscribes.entity';
import {PaymentFormat, Order } from './entities/order.entity';



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
    private readonly iamportService: iamPortService,
  ) {}

  async create({ impUid, merchantUid, subscribeId, currentUser }) {
    // 토큰가져오기 + 결제정보가져오기도 서비스로 나눈다


    // 2. 결제정보를 찾는다
    const iamPortResult = await this.iamportService.searchIamPort({ impUid });

    const amount = iamPortResult.data.response.amount;

    // 3. 프론트에서 넘겨준 제품과 검증이 완료된 유저 정보로 해당 리포지토리로 검색을한다.
    const user = await this.userRepository.findOne({
      id: currentUser.id,
    });
    const subscribe = await this.subscribeRepository.findOne({
      id: subscribeId,
    });

    // 4. 결제정보 (amonut)와 subscribe()의 가격이 맞는지 확인
    if (!(amount == subscribe.price)) {
      throw { status: 'forgery', message: '위조된 결제시도입니다!!!' };
    } 

    // 결제정보가 맞다면 존재하는지 검증한다.
    const checkimpUid = await this.orderRepository.findOne({
      where: { impUid: impUid },
    });

    // 존재하면에러
    if (checkimpUid) {
      throw new ConflictException('이미 등록된 결제입니다.');
    }

    const userSubs = await this.userSubscribeRepository.save({
      subscribe: subscribe,
      user: user,
    });

    return await this.orderRepository.save({
      impUid: impUid,
      merchantUid: merchantUid,
      userSubscribe: userSubs,
    });
  }

  // 허위로 결제를 만들거나 유저가 취소를 요청했을경우의 아임포트서비스 취소
  async cancelIamPort({ impUid, reason = '', currentUser }) {
  
    // 2. 결제정보를 찾는다
    const iamPortResult = await this.iamportService.searchIamPort({ impUid });
    if (iamPortResult.data.response.status === 'canclled') {
      throw new UnprocessableEntityException('이미 취소가된 결제입니다..');
    }

    const currentOrder = await this.orderRepository.findOne({
      relations: [
        'userSubscribe',
        'userSubscribe.user',
        'userSubscribe.subscribe',
      ],
      where: { impUid: impUid },
    });

    const checkUser = await this.userRepository.findOne({
      where: { id: currentOrder.userSubscribe.user.id },
    });

    // 현재유저의 아이디와 현재주문정보의  유저 아이디를 체크한다.
    if (currentUser.id != checkUser.id) {
      throw new UnprocessableEntityException(
        '취소하려는 결제의 유저정보와 현재 유저가 맞지 않습니다.',
      );
    }

    const merchant_uid = currentOrder.merchantUid;
    const checksum = currentOrder.userSubscribe.subscribe.price;

    const cancelResult = await this.iamportService.cancelIamPort({
      reason,
      impUid,
      merchant_uid,
      checksum,
    });

    
    // 취소상태의 오더를 하나 만들어준다
    const { id,  ...rest } = currentOrder

    let cancledOrder = new Order()

    cancledOrder.impUid = rest.impUid
    cancledOrder.merchantUid = rest.merchantUid
    cancledOrder.payment = PaymentFormat.CANCEL
    cancledOrder.userSubscribe = rest.userSubscribe

    cancledOrder = await this.orderRepository.save({
      ...cancledOrder
    })

    return cancledOrder;
  }
}
