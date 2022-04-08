import { Injectable,UnprocessableEntityException, } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Payment } from '../payments/entities/payment.entity'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
    constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>
    ){}


    async findAll(){
        return await this.userRepository.find()
    }

    async findAllWithDeleted(){
        return await this.userRepository.find({
            withDeleted: true
        })
    }

    async find({userId}){
        return await this.userRepository.findOne({id:userId})
    }

    async create({createUserInput}){
        const { payment, ...user } = createUserInput

        const result = await this.paymentRepository.save({
            ...payment
        })

        return await this.userRepository.save({
            ...user,
            payment: result
        })
        
    }

    async update({userId,updateUserInput}){
        const user = await this.userRepository.findOne({
            where : {id : userId}
        })
        const newUser = {
            ...user,
            ...updateUserInput
        }
        return await this.userRepository.save(newUser)
    }

    async checkIsDeleted({userId}){
        const user = await this.userRepository.findOne({
            where : {id : userId}
        })
        if (user.deletedAt) throw new UnprocessableEntityException('이미 삭제가 된 유저입니다.')
    }

    async delete({userId}){
        const result = await this.userRepository.softDelete({id:userId})
        return result.affected ? true : false;
    }
    async restore({userId}){
        const result = await this.userRepository.softDelete({id:userId})
        return result.affected ? true : false;
    }
}