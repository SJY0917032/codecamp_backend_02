import {
  Injectable,
  ConflictException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { iamPortService } from '../iamport/iamport.service';
import { Subscribe } from '../subscribe/entities/subscribe.entity';
import { User } from '../users/entities/user.entity';
import { UserSubscribe } from '../userSubscribes/entities/usersubscribes.entity';
import {PaymentFormat,ShippingFormat, Order } from './entities/order.entity';



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

    // 결제
    private readonly iamportService: iamPortService,

    // Transaction
    private readonly connection:Connection
  ) {}

  async create({ impUid, merchantUid, subscribeId, currentUser }) {
    // 트랜잭션을 관리하는 커넥션 객체를 만든다.
    const queryRunner = this.connection.createQueryRunner();
    // 연결
    await queryRunner.connect();
    // 트랜잭션 시작 및 관리수준 SERIALIZABLE
    await queryRunner.startTransaction('SERIALIZABLE');

    // 2. 결제정보를 찾는다
    const iamPortResult = await this.iamportService.searchIamPort({ impUid });
    const amount = iamPortResult.data.response.amount;

    try {
      // 3. 프론트에서 넘겨준 제품과 검증이 완료된 유저 정보로 해당 리포지토리로 검색을한다.
      const user = await queryRunner.manager.findOne(
        User,
        {id: currentUser.id},
        { lock: { mode: 'pessimistic_write' } },
      );

      const subscribe = await queryRunner.manager.findOne(
        Subscribe,
        {id: subscribeId},
        { lock: { mode: 'pessimistic_write' } },
      );  
      // 4. 결제정보 (amonut)와 subscribe()의 가격이 맞는지 확인
      if (!(amount == subscribe.price)) {
        throw { status: 'forgery', message: '위조된 결제시도입니다!!!' };
      } 
      // 결제정보가 맞다면 존재하는지 검증한다.
      const checkimpUid = await queryRunner.manager.findOne(
        Order,
        { impUid: impUid },
        { lock: { mode: 'pessimistic_write' } },
      );

      // 존재하면에러
      if (checkimpUid) {
        throw new ConflictException('이미 등록된 결제입니다.');
      }

      // 트랜잭션으로 유저구독상태를 만든후 save해준다, 
      const userSubs = await this.userSubscribeRepository.create({
        subscribe: subscribe,
        user: user,
      });
      await queryRunner.manager.save(userSubs)

      const orderResult = await this.orderRepository.create({
        impUid: impUid,
        merchantUid: merchantUid,
        userSubscribe: userSubs,
      });

      await queryRunner.manager.save(orderResult)

      // 최종적으로 모든 쿼리가 성공하면 커밋한다.
      await queryRunner.commitTransaction();

      // 프론트엔드에 orderResult 전달
      return orderResult
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  // 허위로 결제를 만들거나 유저가 취소를 요청했을경우의 아임포트서비스 취소
  async cancelIamPort({ impUid, reason = '', currentUser }) {
      // 트랜잭션을 관리하는 커넥션 객체를 만든다.
      const queryRunner = this.connection.createQueryRunner();
      // 연결
      await queryRunner.connect();
      // 트랜잭션 시작 및 관리수준 SERIALIZABLE
      await queryRunner.startTransaction('SERIALIZABLE');

    // 1. 결제정보를 찾는다
    const iamPortResult = await this.iamportService.searchIamPort({ impUid });
    console.log(iamPortResult.data.response.status)
    if (iamPortResult.data.response.status === 'cancelled') {
      throw new UnprocessableEntityException('이미 취소가된 결제입니다..');
    }

    // 위에서 취소가 안됐다면,
    // 취소로직 진행
    // 트랜잭션으로 관리
    try {
      
      // 결제 정보를 찾고, 유저정보를 찾는다
      const currentOrder = await queryRunner.manager.findOne(
        Order,
        { impUid: impUid,    },
        { lock: { mode: 'pessimistic_write' },
        relations: [
          'userSubscribe',
          'userSubscribe.user',
          'userSubscribe.subscribe',
        ]},
      );

      const checkUser = await queryRunner.manager.findOne(
        User,
        { id: currentOrder.userSubscribe.user.id },
        { lock: { mode: 'pessimistic_write' }}
      );

        // 현재유저의 아이디와 현재주문정보의  유저 아이디를 체크한다.
      if (currentUser.id != checkUser.id) {
        throw new UnprocessableEntityException(
          '취소하려는 결제의 유저정보와 현재 유저가 맞지 않습니다.',
        );
      }

      // 유저아이디 체크가 끝나면 최종적으로 취소 로직

      const merchant_uid = currentOrder.merchantUid;
      const checksum = currentOrder.userSubscribe.subscribe.price;
  
      const cancelResult = await this.iamportService.cancelIamPort({
        reason,
        impUid,
        merchant_uid,
        checksum,
      });

      // 최종적으로 주문이 취소되면 주문을 취소상태로 바꿔주고
      const cancledOrder = await queryRunner.manager.update(
        Order,
        {id: currentOrder.id}, 
        {payment: PaymentFormat.CANCEL, shipping: ShippingFormat.CANCEL}
      )

        

      // 구독취소 ( soft delete 시켜준다.)
      const deleteUserSubscribe = await queryRunner.manager.softDelete(
        UserSubscribe,
        {id: currentOrder.userSubscribe.id}
      )

      // 모든 로직이 성공했다면 커밋
      await queryRunner.commitTransaction();
      return deleteUserSubscribe.affected ? true : false;
    }  catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }





 
 
  }
}
