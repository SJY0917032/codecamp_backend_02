import { UserSubscribe } from 'src/apis/userSubscribes/entities/usersubscribes.entity';
import { Column, Entity,  JoinColumn,  OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ReviewBoard {
  // TODO : 함수로 U0001 이런식으로 생성하게 바꾸는거
  @PrimaryGeneratedColumn('uuid')
  // 자동으로 생성되는 PK컬럼 (uuid형식으로 만들어진다.)
  id: string;

  @JoinColumn()
  @OneToOne(() => UserSubscribe)
  usersubscribe: UserSubscribe

  @Column({type: 'tinyint', nullable:false, default:3})
  star : number

  @Column({type: 'varchar',nullable:false, length:500})
  contents: string
}
