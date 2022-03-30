import { Module } from '@nestjs/common';
import { StarBucksResolver } from './starbucks.resolver';
import { StarBucksService } from './starbucks.service';

@Module({
  providers: [StarBucksResolver, StarBucksService],
})
export class StarBucksModule {}

// 스타벅스 api구조

/**
 * StarBucksModule
 *   ┗ StarBucksResolver
 *         ┗  StarBucksService
 */
