import { Product } from 'src/apis/products/entities/product.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductTag {
  @PrimaryGeneratedColumn('uuid')
  // 자동으로 생성되는 PK컬럼 (uuid형식으로 만들어진다.)
  id: string;

  @Column()
  name: string;

  // N:M 으로 연결하고 프로덕트 입장에서 우리는 무엇인지를 표현한것
  // 즉 products => Tags라는것.
  @ManyToMany(() => Product, (products) => products.productTags)
  products: Product[];
}
