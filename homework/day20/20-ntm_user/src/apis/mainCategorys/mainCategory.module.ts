import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainCategory } from './entities/maincategory.entity';
import { MainCategoryResolver } from './mainCategory.resolver';
import { MainCategoryService } from './mainCategory.service';

@Module({
  imports: [TypeOrmModule.forFeature([MainCategory])],
  //   controllers: [BoardResolver],
  providers: [MainCategoryResolver, MainCategoryService],
})
export class MainCategoryModule {}
