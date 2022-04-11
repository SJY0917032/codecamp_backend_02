import { Field, ObjectType } from '@nestjs/graphql';
import { Subscribe } from 'src/apis/subscribe/entities/subscribe.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class UserSubscribe {
  // TODO : 함수로 U0001 이런식으로 생성하게 바꾸는거
  @PrimaryGeneratedColumn('uuid')
  // 자동으로 생성되는 PK컬럼 (uuid형식으로 만들어진다.)
  id: string;

  @ManyToOne(() => Subscribe)
  @Field(() => Subscribe)
  subscribe: Subscribe

  @ManyToOne(() => User)
  @Field(() => User)
  user: User

  @DeleteDateColumn()
  @Field(() => Date, { nullable: true })
  deletedAt: Date;
}
