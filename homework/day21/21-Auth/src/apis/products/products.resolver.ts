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

  @Query(() => [Product])
  fetchProductsWithDeleted(){
    return this.productService.findAllWithDeleted();
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
    return this.productService.update({ productId, updateProductInput });
  }

  @Mutation(() => Boolean)
  async restoreProduct(
    @Args('productId') productId: string,
  ){
    return this.productService.restore({productId})
  }


  @Mutation(() => Boolean)
  async deleteProduct(
    @Args("productId") productId: string, //
  ){
    return this.productService.delete({productId})
  }
}
