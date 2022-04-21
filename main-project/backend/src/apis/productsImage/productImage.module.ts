import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileService } from '../file/file.service';
import { Product } from '../products/entities/product.entity';
import { ProductImage } from './entities/productImage.entity';
import { ProductImageResolver } from './productImage.resolver';
import { ProductImageService } from './productImage.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductImage])],
  providers: [ProductImageResolver, ProductImageService, FileService],
})
export class ProductImageModule {}
