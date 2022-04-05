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
    };
    return await this.productRepository.save(newProduct);
  }
}
