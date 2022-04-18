import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
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

    private readonly connection: Connection,
  ) {}

  async create({ impUid, amount, currentUser }) {
    const queryRunner = this.connection.createQueryRunner();
    // 연결
    await queryRunner.connect();
    // 트랜잭션 start
    await queryRunner.startTransaction();
    // 트랜잭션 시작
    try {
      // 1. 거래기록을 생성하는것
      const pointTransaction = await this.pointTransactionRepository.create({
        impUid: impUid,
        amount: amount,
        user: currentUser,
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      });
      // create후 쿼리러너의 manager를 이용해 save를 시켜준다.
      await queryRunner.manager.save(pointTransaction);

      // 2. 유저의 돈 찾기
      const user = await this.userRepository.findOne({
        id: currentUser.id,
      });
      console.log(user);

      // 3. 유저의 돈 업데이트
      // await this.userRepository.update(
      //   { id: currentUser.id },
      //   {
      //     point: (user.point += amount),
      //   },
      // );

      const updateUser = await this.userRepository.create({
        // 기존의내용에
        ...user,
        // 바꾸고싶은것만 넣는다.
        point: (user.point += amount),
      });
      // 이것또한 트랜잭션에 넣어준다
      await queryRunner.manager.save(updateUser);

      // 성공 확정( Commit )
      await queryRunner.commitTransaction();

      // 4. 최종결과 프론트엔드에 전달
      return pointTransaction;
    } catch (error) {
      // 진행중에 실패시 이 트랜잭션 전체를
      // Rollback
      await queryRunner.rollbackTransaction();
    } finally {
      // 최종적으로 연겷을 해제해줘야한다.
      await queryRunner.release();
      // 실패를하건, 성공을하건.
    }
  }
}
