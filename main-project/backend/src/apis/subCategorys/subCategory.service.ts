import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MainCategory } from '../mainCategorys/entities/maincategory.entity';
import { SubCategory } from './entities/subcategory.entity';


@Injectable()
export class SubCategoryService {
  constructor(
    @InjectRepository(SubCategory)
    private readonly subCategoryRepository: Repository<SubCategory>,
    @InjectRepository(MainCategory)
    private readonly mainCategoryRepository: Repository<MainCategory>,
  ) {}
  async create({ name, mainCategoryId }) {
    // Category를 생성하고
    // DB에 저장한다.
    const result = await this.mainCategoryRepository.findOne({
      id: mainCategoryId,
    })

    return await this.subCategoryRepository.save({ name: name, mainCategory: result });
  }

  async delete({ subCategoryId }){
    const result = await this.subCategoryRepository.softDelete({id:subCategoryId})
    return result.affected ? true : false;
  }
}
