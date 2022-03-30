import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateStarBucksInput } from './dto/createStarbucks.input';
import { StarBucks } from './entities/starbucks.entity';
import { StarBucksService } from './starbucks.service';

@Resolver()
export class StarBucksResolver {
  constructor(private readonly starbucksService: StarBucksService) {}

  // @Query(() => String) // String => GraphQL Type , string => TypeScripts Type
  // fetchBoards(): string {
  //   return this.boardService.aaa();
  // }
  @Query(() => [StarBucks])
  fetchStarbucks() {
    return this.starbucksService.findAll();
  }

  @Mutation(() => String)
  createStarbucks(
    @Args('createStarBucksInput') createStarBucksInput: CreateStarBucksInput,
  ) {
    console.log(createStarBucksInput.name);
    console.log(createStarBucksInput.price);
    console.log(createStarBucksInput.kcal);
    console.log(createStarBucksInput.fat);
    console.log(createStarBucksInput.protein);
    console.log(createStarBucksInput.sodium);
    console.log(createStarBucksInput.sugars);
    console.log(createStarBucksInput.caffeine);
    return this.starbucksService.create();
  }
}
