import { Product } from 'src/apis/products/entities/product.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Subscribe {
  // TODO : 함수로 U0001 이런식으로 생성하게 바꾸는거
  @PrimaryGeneratedColumn('uuid')
  // 자동으로 생성되는 PK컬럼 (uuid형식으로 만들어진다.)
  id: string;

  @Column({type:'int'})
  year: number;

  @Column({type:'int'})
  month: number;

  @Column({type:'int'})
  price: number;

  @Column({type: 'boolean', default:false})
  isActive: boolean;

  // N:M 으로 연결하고 우리는 무엇인지를 표현한것
  @ManyToMany(() => Product, (products) => products.subscribes)
  products: Product[]
}
