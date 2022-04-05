import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/createProductInput';
import { UpdateProductInput } from './dto/updateProductInput';
import { Product } from './entities/product.entity';
import { ProductService } from './products.service';

@Resolver()
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [Product])
  fetchProducts() {
    return this.productService.findAll();
  }

  @Query(() => Product)
  fetchProduct(
    @Args('productId') productID: string, //
  ) {
    return this.productService.find({ productID });
  }

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput, //
  ) {
    return this.productService.create({ createProductInput });
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('productId') productId: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput, //
  ) {
    // 판매완료가 됐는지 확인하자.
    await this.productService.checkSoldOut({ productId });
    // 판매가 완료된상태면 여기서 프로세스가 종료된다, 만약 완료가안된상태면 밑의 return문이 돌아간다.
    // 그후 수정을한다.
    return this.productService.update({ productId, updateProductInput });
  }
}
