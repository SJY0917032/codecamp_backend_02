import {
    Injectable,
    UnprocessableEntityException,
  } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubscribeInput } from './dto/createSubscribeInput';
import { Subscribe } from './entities/subscribe.entity';

@Injectable()
export class SubscribeService{
    constructor(
        @InjectRepository(Subscribe)
        private readonly subscribeRepository: Repository<Subscribe>,
    ){}

    async findAll() {
        return await this.subscribeRepository.find();
    }

    async find({subscribeId}){
        return await this.subscribeRepository.findOne({id : subscribeId})
    }

    async create({ createSubscribeInput }){
        // 구독정보를 저장한다
        // 추가해야하는것 : N:M들..

        const result = await this.subscribeRepository.save({
            ...createSubscribeInput,
        });
        return result;
    }

    async update({ subscribeId, updateSubscribeInput }) {
        const beforeSubscribe = await this.subscribeRepository.findOne({
            where: {id : subscribeId},
        });
        const afterSubscribe = {
            ...beforeSubscribe,
            ...updateSubscribeInput
        }
        return await this.subscribeRepository.save(afterSubscribe)
    }

    async checkActive({ subscribeId }) {
        const subscribe = await this.subscribeRepository.findOne({
            where : { id : subscribeId},
        });

        if (subscribe.isActive) throw new UnprocessableEntityException('현재 판매중이지 않은 구독 상품입니다.')
    }
}