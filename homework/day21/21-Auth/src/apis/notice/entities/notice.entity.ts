import { User } from 'src/apis/users/entities/user.entity';
import { Column, Entity,  ManyToOne,  OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { NoticeCategory } from './noticecategory.entity';

@Entity()
export class Notice {
  // TODO : 함수로 U0001 이런식으로 생성하게 바꾸는거
  @PrimaryGeneratedColumn('uuid')
  // 자동으로 생성되는 PK컬럼 (uuid형식으로 만들어진다.)
  id: string;

  @ManyToOne(() => User)
  user: User

  @ManyToOne(() => NoticeCategory)
  category : NoticeCategory

  @Column({type:'varchar', length:50, nullable:false})
  title : string

  @Column({type: 'varchar',length:500, nullable:false, })
  contents: string
}
