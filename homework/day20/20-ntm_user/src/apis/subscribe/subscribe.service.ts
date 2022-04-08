import {
    Injectable,
    UnprocessableEntityException,
  } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { SubCategory } from '../subCategorys/entities/subcategory.entity';
import { CreateSubscribeInput } from './dto/createSubscribeInput';
import { Subscribe } from './entities/subscribe.entity';

@Injectable()
export class SubscribeService{
    constructor(
        @InjectRepository(Subscribe)
        private readonly subscribeRepository: Repository<Subscribe>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(SubCategory)
        private readonly subCategoryRepository: Repository<SubCategory>,
    ){}

    async findAll() {
        return await this.subscribeRepository.find();
    }

    async findAllWithDeleted(){
        return await this.subscribeRepository.find({
            withDeleted: true
        })
    }

    async find({subscribeId}){
        return await this.subscribeRepository.findOne({id : subscribeId})
    }

    async create({ createSubscribeInput }){
        // 구독정보를 저장한다
        // 추가해야하는것 : N:M들..
        const { products, ...subscribe } = createSubscribeInput
        console.log(products)
        // 제품정보 배열을 받는다 ([createProductInput])
        const ProductResults = [];

        for (let i = 0; i < products.length; i++){         
            const subCategoryResult = await this.subCategoryRepository.findOne({id:products[i].subCategoryId})

            const productResult = await this.productRepository.save({
                name: products[i].name,
                subCategory: subCategoryResult
            })
            ProductResults.push(productResult)
        }
        // 배열을 나눠서 계속 저장시킨다 // 중간에 서브카테고리도 저장해야함

        // 최종적으로 제품을저장한다.
        const result = await this.subscribeRepository.save({
            ...subscribe,
            products: ProductResults
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

        if (subscribe.deletedAt) throw new UnprocessableEntityException('현재 판매중이지 않은 구독 상품입니다.')
    }

    async restore({subscribeId}){
        return await this.subscribeRepository.restore({ id : subscribeId})
    }

    async delete({subscribeId}){
        const result = await this.subscribeRepository.softDelete({
            id : subscribeId
        })
        return result.affected ? true : false;
    }
}