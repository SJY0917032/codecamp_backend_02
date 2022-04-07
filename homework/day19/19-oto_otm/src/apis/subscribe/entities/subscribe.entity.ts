import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/apis/products/entities/product.entity';
import { Column, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Subscribe {
  // TODO : 함수로 U0001 이런식으로 생성하게 바꾸는거
  @PrimaryGeneratedColumn('uuid')
  // 자동으로 생성되는 PK컬럼 (uuid형식으로 만들어진다.)
  @Field(() => String)
  id: string;

  @Column({type: "varchar", length:255, unique:true})
  @Field(() => String)
  title: string;

  @Column({type:'int'})
  @Field(() => Int)
  year: number;

  @Column({type:'int'})
  @Field(() => Int)
  month: number;

  @Column({type:'int'})
  @Field(() => Int)
  price: number;

  @DeleteDateColumn()
  @Field(() => Date, { nullable: true })
  deletedAt: Date;
  
  // N:M 으로 연결하고 우리는 무엇인지를 표현한것
  @ManyToMany(() => Product, (products) => products.subscribes)
  @Field(() => [Product], {nullable:true})
  products: Product[]
}
