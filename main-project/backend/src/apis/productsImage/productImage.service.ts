import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProductImage } from './entities/productImage.entity';
import { Storage } from '@google-cloud/storage';
import { config } from 'dotenv';
import { FileUpload } from 'graphql-upload';
import { Product } from '../products/entities/product.entity';

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

    // 일단 먼저 다 받아오기
    const waitedImages = await Promise.all(images);

    const results = await Promise.all(
      // 다 받아온 파일들을 각각 Promise형태로 바꿔주고 위에서 ALL로 처리한다.
      waitedImages.map((e) => {
        const res: Promise<string> = new Promise((res, rej) => {
          e.createReadStream()
            .pipe(storage.file(e.filename).createWriteStream())
            .on('finish', () =>
              // 성공시에 해당함수
              res(`${process.env.GOOGLE_BUCKET}/${e.filename}`),
            )
            .on('error', () =>
              // 실패시에 해당함수
              rej(),
            );
        });
        return res;
      }),
    );

    const savedResults = await Promise.all(
      results.map((el) => {
        const saveData: Promise<ProductImage> = new Promise((res, rej) => {
          const aaa = this.productImageRepository.save({
            product: product,
            url: el,
          });
          res(aaa);
          rej(console.log('에러발생~'));
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

    if (!productId) {
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
    const waitedImages = await Promise.all(images);

    const deleteImages = [];
    const updateImages = waitedImages.filter((e) => {
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

    const results = await Promise.all(
      // 다 받아온 파일들을 각각 Promise형태로 바꿔주고 위에서 ALL로 처리한다.
      updateImages.map((e) => {
        const res: Promise<string> = new Promise((res, rej) => {
          e.createReadStream()
            .pipe(storage.file(e.filename).createWriteStream())
            .on('finish', () =>
              // 성공시에 해당함수
              res(`${process.env.GOOGLE_BUCKET}/${e.filename}`),
            )
            .on('error', () =>
              // 실패시에 해당함수
              rej(),
            );
        });
        return res;
      }),
    );

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
