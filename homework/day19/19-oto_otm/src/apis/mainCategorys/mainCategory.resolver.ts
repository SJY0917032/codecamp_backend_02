import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { MainCategory } from './entities/maincategory.entity';
import { MainCategoryService } from './mainCategory.service';

@Resolver()
export class MainCategoryResolver {
  constructor(
    private readonly mainCategoryService: MainCategoryService,
  ) {}
  @Mutation(() => MainCategory)
  createMainCategory(
    @Args('name') name: string, //
  ) {
    return this.mainCategoryService.create({ name });
  }

  @Mutation(() => Boolean)
  deleteMainCategory(
    @Args('mainCategoryId') mainCategoryId: string, //
  ){
    return this.mainCategoryService.delete({mainCategoryId})
  }
}
