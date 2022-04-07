import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MainCategory } from './entities/maincategory.entity';


@Injectable()
export class MainCategoryService {
  constructor(
    @InjectRepository(MainCategory)
    private readonly mainCategoryRepository: Repository<MainCategory>,
  ) {}
  async create({ name }) {
    // Category를 생성하고
    // DB에 저장한다.
    const result = await this.mainCategoryRepository.save({ name: name });

    return result;
  }

  async delete({mainCategoryId}){
    const result = await this.mainCategoryRepository.softDelete({id:mainCategoryId})
    return result.affected ? true : false;
  }
}
