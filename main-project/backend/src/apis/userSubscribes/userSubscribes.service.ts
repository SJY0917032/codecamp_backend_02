import { Injectable,UnprocessableEntityException, } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscribe } from '../subscribe/entities/subscribe.entity';
import { User } from '../users/entities/user.entity';
import { UserSubscribe } from './entities/usersubscribes.entity';



@Injectable()
export class UserSubscribesService {
  constructor(
    @InjectRepository(Subscribe)
    private readonly subscribeRepository: Repository<Subscribe>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserSubscribe)
    private readonly userSubscribeRepository: Repository<UserSubscribe>
  ) {}
  async findAll() {
    return await this.userSubscribeRepository.find({
      relations: ['subscribe', 'user']
    })
  }
  
  async findAllWithDeleted() {
    return await this.userSubscribeRepository.find({
      relations: ['subscribe', 'user'],
      withDeleted: true
    })
  }

  async find({usersubscribesId}){
    return await this.userSubscribeRepository.findOne({
      where: {id:usersubscribesId},
      relations: ['subscribe', 'user']
    })
  }



  async create({ subscribeId, userId }) {
    // Category를 생성하고
    // DB에 저장한다.
    const subscribe = await this.subscribeRepository.findOne({
      id: subscribeId,
    })
    const user = await this.userRepository.findOne({
      id : userId
    })

    return await this.userSubscribeRepository.save({
      subscribe: subscribe,
      user: user
    })
  }

  async delete({ usersubscribesId }){
    const result = await this.userSubscribeRepository.softDelete({id:usersubscribesId})
    return result.affected ? true : false;
  }

  async checkIsDeleted({usersubscribesId}){
    const usersubscribes = await this.userSubscribeRepository.findOne({
        where : {id : usersubscribesId}
    })
    if (usersubscribes.deletedAt) throw new UnprocessableEntityException('이미 삭제가 됐거나 판매가된 유저가 구독한 상품입니다.')
}

async restore({usersubscribesId}){
  return await this.userSubscribeRepository.restore({id:usersubscribesId})
}
}
