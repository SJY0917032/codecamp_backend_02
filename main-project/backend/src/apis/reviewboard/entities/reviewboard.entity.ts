import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/apis/users/entities/user.entity';
import { Column, CreateDateColumn, Entity,  JoinColumn,  ManyToOne,  OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ReviewBoard {
  // TODO : 함수로 U0001 이런식으로 생성하게 바꾸는거
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  // 자동으로 생성되는 PK컬럼 (uuid형식으로 만들어진다.)
  id: string;

  @JoinColumn()
  @ManyToOne(() => User)
  @Field(() => User)
  user: User

  @Column({type: 'tinyint', default:3})
  @Field(() => Int)
  star : number

  @Column({type: 'varchar',length:500})
  @Field(() => String)
  contents: string

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date
}
