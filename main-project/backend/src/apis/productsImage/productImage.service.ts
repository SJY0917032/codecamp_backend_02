import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProductImage } from './entities/productImage.entity';
import { Storage } from '@google-cloud/storage';
import { config } from 'dotenv';
import { FileUpload } from 'graphql-upload';
import { Product } from '../products/entities/product.entity';
import { FileService } from '../file/file.service';

config();

interface IImages {
  productId: string;
  images: FileUpload[];
}

@Injectable()
export class ProductImageService {
  constructor(
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    private readonly fileService: FileService
  ) {}

  async upload({ productId, images }: IImages) {
    const storage = new Storage({
      keyFilename: process.env.KEY_FILENAME,
      projectId: process.env.PROJECT_ID,
    }).bucket(process.env.GOOGLE_BUCKET);

    // 받아온 제품아이디로 일단 제품을 찾아온다
    const product = await this.productRepository.findOne({
      id: productId,
    });

    if (!productId) {
      throw new UnprocessableEntityException('🚧제품아이디가 이상한데용?🚧');
    }

    const processFiles = await Promise.all(images)

    // 4.21 리팩터링 ( 파일업로드 부분을 서비스로 분할 )
    const results = await this.fileService.uploadFileToStorage({processFiles: processFiles})

    const savedResults = await Promise.all(
      results.map((el) => {
        const saveData: Promise<ProductImage> = new Promise((res, rej) => {
          const aaa = this.productImageRepository.save({
            product: product,
            url: el,
          });
          res(aaa);
        });
        return saveData;
      }),
    );

    

    return results;
  }
  async update({ productId, images }: IImages) {
    const storage = new Storage({
      keyFilename: process.env.KEY_FILENAME,
      projectId: process.env.PROJECT_ID,
    }).bucket(process.env.GOOGLE_BUCKET);

    // 받아온 제품아이디로 일단 제품을 찾아온다
    // FIXME : 제품찾는건 제품서비스에서 불러오기
    const product = await this.productRepository.findOne({
      id: productId,
    });
    

    if (!product) {
      throw new UnprocessableEntityException('🚧제품아이디가 이상한데용?🚧');
    }

    const findImages = await this.productImageRepository.find({
      where: { product: productId },
    });

    const currentImages = [];

    findImages.map((e) => {
      currentImages.push(e.url);
    });
    // 일단 먼저 다 받아오기
    const processFiles = await Promise.all(images)

    const deleteImages = [];
    const updateImages = processFiles.filter((e) => {
      if (
        currentImages.includes(`${process.env.GOOGLE_BUCKET}/${e.filename}`)
      ) {
        deleteImages.push(e);
        return false;
      }
      return true;
    });
    

    console.log(deleteImages);
    console.log(updateImages);

    if (deleteImages.length > 0) {
      const deleteResults = await Promise.all(
        deleteImages.map((e) => {
          const del: Promise<UpdateResult> = new Promise((res, rej) => {
            const aaa = this.productImageRepository.softDelete({
              url: `${process.env.GOOGLE_BUCKET}/${e.filename}`,
            });
            res(aaa);
          });
          return del;
        }),
      );
      console.log(deleteResults);
    }

    // 4.21 리팩터링 ( 파일업로드 부분을 서비스로 분할 )
    const results = await this.fileService.uploadFileToStorage({processFiles: updateImages})

    const savedResults = await Promise.all(
      results.map((el) => {
        const saveData: Promise<ProductImage> = new Promise((res, rej) => {
          const aaa = this.productImageRepository.save({
            product: product,
            url: el,
          });
          res(aaa);
        });
        return saveData;
      }),
    );

    return results;
  }
}
