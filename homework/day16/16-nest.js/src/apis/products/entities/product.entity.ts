import { SubCategory } from 'src/apis/subCategorys/entities/subcategory.entity';
import { Subscribe } from 'src/apis/subscribe/entities/subscribe.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  // 자동으로 생성되는 PK컬럼 (uuid형식으로 만들어진다.)
  id: string;

  @Column({type:'varchar', length:255, nullable:false})
  name: string;


  @ManyToOne(() => SubCategory)
  subCategory: SubCategory
  
  // N:M 으로 연결하고 우리는 무엇인지를 표현한것
  @JoinTable()
  @ManyToMany(() => Subscribe, (subscribes) => subscribes.products)
  subscribes : Subscribe[]
}
