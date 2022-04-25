import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { ReviewBoard } from './entities/reviewboard.entity';
import { ReviewResolver } from './reviewBoard.resolver';
import { ReviewService } from './reviewBoard.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
@Module({
    imports: [TypeOrmModule.forFeature([ReviewBoard, User]),
    ElasticsearchModule.register({
        node: 'http://elasticsearch:9200',
      }),],
    providers: [ReviewResolver, ReviewService]

})
export class ReviewModule{}