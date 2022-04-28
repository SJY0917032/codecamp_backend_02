import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { CreateProductInput } from './dto/createProductInput';
import { UpdateProductInput } from './dto/updateProductInput';
import { Product } from './entities/product.entity';
import { ProductService } from './products.service';

@Resolver()
export class ProductResolver {
  constructor(
    private readonly productService: ProductService, //
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  @Query(() => [Product])
  async fetchProducts() {
    // Use ElasticSearch 조회 연습

    const results = await this.elasticsearchService.search({
      index: 'myproduct',
      query: {
        match_all: {},
      },
    });

    console.log(results);

    console.log(JSON.stringify(results, null, '  '));

    return results;

    /**
     * 임시주석. 엘라스틱서치로 조회테스트
     */
    // return this.productService.findAll();
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
    // Use elasticsearch
    // this.elasticsearchService.create({
    //   id: 'myid',
    //   index: 'myproduct',
    //   document: {
    //     name: 'test',
    //   },
    // });

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

  @Mutation(() => Boolean)
  deleteProduct(
    @Args('productId') productId: string, //
  ) {
    // 제품을 삭제한다.
    return this.productService.delete({ productId });
    // 제품이 삭제됐다면 True or False
  }
}
