import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardService } from './boards.service';
import { CreateBoardInput } from './dto/createBoard.input';
import { Board } from './entities/boards.entity';

//Redis
import { Cache } from 'cache-manager';

@Resolver()
export class BoardResolver {
  constructor(
    private readonly boardService: BoardService, //

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  // @Query(() => String) // String => GraphQL Type , string => TypeScripts Type
  // fetchBoards(): string {
  //   return this.boardService.aaa();
  // }
  @Query(() => [Board])
  fetchBoards() {
    return this.boardService.findAll();
  }

  @Mutation(() => String)
  async createBoard(
    @Args('writer') writer: string, // front로 이런형식으로 데이터를 받는다.
    @Args('title') title: string,
    @Args('contents') contents: string,
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ) {
    await this.cacheManager.set('aaa', createBoardInput, {
      ttl: 0,
    });
    const myCache = this.cacheManager.get('aaa');
    console.log(myCache);

    return 'Cache Test';
    /**
     * Redis 연습을위해 밑의 Create는 임시 주석을 걸었습니다.
     */
    // console.log(writer);
    // console.log(title);
    // console.log(contents);
    // console.log(createBoardInput);
    // return this.boardService.create();
  }
}
