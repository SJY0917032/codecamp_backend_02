import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async findAll() {
    return await this.productRepository.find();
  }

  async find({ productID }) {
    return await this.productRepository.findOne({ id: productID });
  }

  async create({ createProductInput }) {
    // Product를 생성하고
    // DB에 저장한다.
    const result = await this.productRepository.save({
      ...createProductInput,
    });
    return result;
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
}
