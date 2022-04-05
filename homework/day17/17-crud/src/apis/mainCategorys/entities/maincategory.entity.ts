import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class MainCategory {
  // TODO : 함수로 U0001 이런식으로 생성하게 바꾸는거
  @PrimaryGeneratedColumn('uuid')
  // 자동으로 생성되는 PK컬럼 (uuid형식으로 만들어진다.)
  @Field(() => String)
  id: string;

  @Column({type:'varchar', length:50, unique:true})
  @Field(() => String)
  name: string

}
