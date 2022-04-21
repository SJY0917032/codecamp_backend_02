import { Module } from '@nestjs/common';
import { BoardResolver } from './boards.resolver';
import { BoardService } from './boards.service';

@Module({
  //   imports: [],
  //   controllers: [BoardResolver],
  providers: [BoardResolver, BoardService],
})
export class BoardModule {}

// 게시글 api구조

/**
 * BoardModule
 *   ┗ BoardResolver
 *         ┗  BoardService
 */
