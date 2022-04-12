import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubCategory } from '../subCategorys/entities/subcategory.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(SubCategory)
    private readonly subCategoryRepository: Repository<SubCategory>,
  ) {}
  async findAll() {
    return await this.productRepository.find({ relations: ['subCategory'] });
  }

  async findAllWithDeleted() {
    return await this.productRepository.find({
      withDeleted: true,
      relations: ['subCategory'],
    });
  }

  async find({ productID }) {
    return await this.productRepository.findOne({
      where: { id: productID },
      relations: ['subCategory'],
    });
  }

  async create({ createProductInput }) {
    const { subCategoryId, ...product } = createProductInput;

    // 서브카테고리를 찾은 결과
    const result = await this.subCategoryRepository.findOne({
      id: subCategoryId,
    });

    // Product를 생성하고
    // DB에 저장한다.
    return await this.productRepository.save({
      ...product,
      subCategory: result,
    });
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

  async restore({ productId }) {
    return await this.productRepository.restore({ id: productId });
  }

  async delete({ productId }) {
    const result = await this.productRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }
}
