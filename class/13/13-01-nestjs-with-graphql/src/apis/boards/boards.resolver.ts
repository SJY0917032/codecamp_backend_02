import { Query, Resolver } from '@nestjs/graphql';
import { BoardService } from './boards.service';

@Resolver()
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {}

  @Query(() => String) // String => GraphQL Type , string => TypeScripts Type
  fetchBoards(): string {
    return this.boardService.aaa();
  }
}
