import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType() // class지만 사실은 GraphQL 객체타입이된다.
export class Board {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => Int) // GraphQL 타입지정 (Number => Int)
  number: number;

  @Column()
  @Field(() => String, {nullable:true}) // GraphQL 타입지정 (string => String)
  writer: string;

  @Column()
  @Field(() => String , {nullable:true}) // GraphQL 타입지정 (string => String)
  title: string;

  @Column()
  @Field(() => String , {nullable:true}) // GraphQL 타입지정 (string => String)
  contents: string;
}
