import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainCategory } from '../mainCategorys/entities/maincategory.entity';
import { SubCategory } from './entities/subcategory.entity';
import { SubCategoryResolver } from './subCategory.resolver';
import { SubCategoryService } from './subCategory.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubCategory, MainCategory])],
  //   controllers: [BoardResolver],
  providers: [SubCategoryResolver, SubCategoryService],
})
export class SubCategoryModule {}
