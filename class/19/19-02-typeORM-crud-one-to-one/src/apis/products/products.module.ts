import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSaleslocation } from '../productSaleslocation/entities/productSaleslocation.entity';
import { Product } from './entities/product.entity';
import { ProductResolver } from './products.resolver';
import { ProductService } from './products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductSaleslocation])],
  //   controllers: [BoardResolver],
  providers: [ProductResolver, ProductService],
})
export class ProductModule {}
