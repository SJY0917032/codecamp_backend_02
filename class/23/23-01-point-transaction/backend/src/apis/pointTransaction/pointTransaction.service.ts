import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import {
  PointTransaction,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entities/pointTransaction.entity';

@Injectable()
export class PointTransactionService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointTransactionRepository: Repository<PointTransaction>, //
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create({ impUid, amount, currentUser }) {
    // 1. 거래기록을 생성하는것
    const pointTransaction = await this.pointTransactionRepository.save({
      impUid: impUid,
      amount: amount,
      user: currentUser,
      status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
    });
    console.log(pointTransaction);

    // 2. 유저의 돈 찾기
    const user = await this.userRepository.findOne({
      id: currentUser.id,
    });
    console.log(user);

    // 3. 유저의 돈 업데이트
    await this.userRepository.update(
      { id: currentUser.id },
      {
        point: (user.point += amount),
      },
    );

    // 4. 최종결과 프론트엔드에 전달
    return pointTransaction;
  }
}
