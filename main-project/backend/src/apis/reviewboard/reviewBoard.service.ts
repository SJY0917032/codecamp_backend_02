import {
    Injectable,
    CACHE_MANAGER,
    Inject,
  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { ReviewBoard } from './entities/reviewboard.entity';
/**
 * Elastic Serach
 */
import { ElasticsearchService } from '@nestjs/elasticsearch';
/**
 * Redis
 */
 import { Cache } from 'cache-manager';



@Injectable()
export class ReviewService{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,//
        @InjectRepository(ReviewBoard)
        private readonly reviewBoardRepository: Repository<ReviewBoard>,//
        // 엘라스띡
        private readonly elasticsearchService: ElasticsearchService,
        // 레뒤스
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache
    ){}

    async find({word, star}){
        // 1. Redis에서 해당 검색어를 검색한다
        const redisRes = await this.cacheManager.get(`${word}and${star}`)

        if(redisRes){
            console.log("레디스에서 결과값을 가져왔습니다.");
            return redisRes
        } 
        // 2. 있다면 레디스에서 리턴시켜준다
        
        
        // 3. 없으면 ElasticSearch에서 해당 검색어를 검색한다.
        const result = await this.elasticsearchService.search({
            index: 'reviews',
        //  prefix : ~로 시작하는 모든것을 가져와라 (4word4) 이런식이면 못가져옴
        //     query: { 
        //         prefix:{
        //             contents:word
        //         }
        //    }
        // wildcard : ** 안에있는 단어를 wildcard로사용, 포함되는 모든것을 가져와라.
            // query:{
            //     wildcard:{
            //         contents:{value:`*${word}*`}
            //     }
            // }
        // range + wildcard  (해당별점에있는 "word"가포함된 내용)
            query:{
                bool:{
                    must:[{range:{
                        star:{
                            gte:star,
                            lte:star
                        }
                    }},{
                        wildcard:{
                            contents:{value:`*${word}*`}
                        }
                    }]
                }
            }
        })


        const hits = result.hits.hits.map((e) => e._source)
        // 4. 조회한 결과를 Redis에 저장시킨다
        await this.cacheManager.set(`${word}and${star}`, hits, {
            ttl: 60
        })
        console.log(hits)
        console.log("엘라스틱서치에서 결과값을 가져왔습니다.");
        return hits
    }


    async create({createReviewBoard}){
        const { userId, ...Review} = createReviewBoard
        
        // User를 찾고
        const user = await this.userRepository.findOne({
            id:userId
        })

        return await this.reviewBoardRepository.save({
            ...Review,
            user:user,
        })
    }
}