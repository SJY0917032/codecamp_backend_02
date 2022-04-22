import { InputType, OmitType } from '@nestjs/graphql';
import { ProductSaleslocation } from '../entities/productSaleslocation.entity';

@InputType()
export class ProductSaleslocationInput extends OmitType(
  ProductSaleslocation, // 참조할 엔티티
  ['id'], // 뺄 컬럼
  InputType, // 무엇으로 쓸것인가?
) {}
