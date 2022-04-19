import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProductImageService } from './productImage.service';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { ProductImage } from './entities/productImage.entity';

@Resolver()
export class ProductImageResolver {
  constructor(
    private readonly productImageService: ProductImageService, //
  ) {}

  /**
   *  혹시몰라서 남겨둡니당..
   *  업로드 이미지 포스트맨 소스입니다
   *
   * { "query": "mutation uploadImage($images: [Upload!]!, $productId: String!) { uploadImage(images: $images, productId: $productId)}", "variables": { "images": [null, null], "productId": "27b12165-70c0-4e9d-8cb3-b4c993661120" } }
   * { "0": ["variables.images.0"], "1": ["variables.images.1"]}
   *
   * 파일 파일
   */

  @Mutation(() => [String])
  async uploadImage(
    @Args({ name: 'images', type: () => [GraphQLUpload] }) images: FileUpload[],
    @Args('productId') productId: string,
  ) {
    return await this.productImageService.upload({ productId, images });
  }

  /**
   *
   * 업데이트파일 포스트맨입니다
   *
   *{ "query": "mutation updateImage($images: [Upload!]!, $productId: String!) { updateImage(images: $images, productId: $productId)}", "variables": { "images": [null, null], "productId": "27b12165-70c0-4e9d-8cb3-b4c993661120" } }
  { "0": ["variables.images.0"], "1": ["variables.images.1"]}
   * 파일 파일
   */

  @Mutation(() => [String])
  async updateImage(
    @Args({ name: 'images', type: () => [GraphQLUpload] }) images: FileUpload[],
    @Args('productId') productId: string,
  ) {
    return await this.productImageService.update({ productId, images });
  }
}
