import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SubCategory } from './entities/subcategory.entity';
import { SubCategoryService } from './subCategory.service';

@Resolver()
export class SubCategoryResolver {
  constructor(
    private readonly subCategoryService: SubCategoryService,
  ) {}
  @Mutation(() => SubCategory)
  createSubCategory(
    @Args('name') name: string, //
    @Args('mainCategoryId') mainCategoryId: string,
  ) {
    return this.subCategoryService.create({ name, mainCategoryId });
  }

  @Mutation(() => Boolean)
  deleteSubCategory(
    @Args("subCategoryId") subCategoryId: string, //
  ){
    return this.subCategoryService.delete({subCategoryId})
  }
}
