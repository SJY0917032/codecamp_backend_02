import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSaleslocation } from '../productSaleslocation/entities/productSaleslocation.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductSaleslocation)
    private readonly productSaleslocationRepository: Repository<ProductSaleslocation>,
  ) {}
  async findAll() {
    return await this.productRepository.find();
  }

  async find({ productID }) {
    return await this.productRepository.findOne({ id: productID });
  }

  async create({ createProductInput }) {
    // 1. 상품만 등록하는경우
    // Product를 생성하고
    // DB에 저장한다.
    // const result = await this.productRepository.save({
    // ...createProductInput,
    // });

    // 2. 상품과 상품거래위치를 같이 등록하는경우 (Join)
    const { productSaleslocation, ...product } = createProductInput;

    const result = await this.productSaleslocationRepository.save({
      ...productSaleslocation,
    });

    return this.productRepository.save({
      ...product,
      productSaleslocation: result, //{ id: result.id }, 동일하게 인식한다.
    });
  }

  async update({ productId, updateProductInput }) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    const newProduct = {
      ...product,
      ...updateProductInput,
      // id: product.id,
      // name: product.name,
      // description: product.description,
      // price: product.price,
      // isSoldout: product.isSoldOut,

      // description: updateProductInput.description,
      // price: updateProductInput.price,
    };
    return await this.productRepository.save(newProduct);
  }

  async checkSoldOut({ productId }) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    // try - catch - finally 를 사용(예외사항을 방지하기위해)하지만
    // 나중에 공통부분으로 뺄수있다.

    if (product.isSoldOut)
      throw new UnprocessableEntityException('이미 판매가 완료된 상품입니다.');
    // if (product.isSoldOut) {
    //   // 예외처리시켜주기(판매가 완료된상태)
    //   throw new HttpException(
    //     '이미 판매가 완료됐습니다.',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }
  }

  async delete({ productId }) {
    // 제품을 삭제하는 비즈니스로직

    // 1. 실제 삭제(db의 데이터를 물리적으로 삭제한다.)
    // const result = await this.productRepository.delete({ id: productId });
    // return result.affected ? true : false;

    // 2. soft-deleted(직접구현)
    // this.productRepository.update({ id: productId }, { deletedAt: new Date() });

    // 3. soft-deleted(Type-ORM) softRemove
    this.productRepository.softRemove({ id: productId }); // id로만 삭제

    // 4. soft-deleted(Type-ORM) softDelete
    const result = await this.productRepository.softDelete({ id: productId }); // 다양한 조건으로 삭제가능.

    return result.affected ? true : false;

    // 삭제가됐다면 1이기때문에 true
    // 아니라면 false가 반환된다.
  }
}
