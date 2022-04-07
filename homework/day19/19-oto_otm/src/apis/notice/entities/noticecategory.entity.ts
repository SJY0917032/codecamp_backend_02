import { User } from 'src/apis/users/entities/user.entity';
import { Column, Entity,  PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class NoticeCategory {
  // TODO : 함수로 U0001 이런식으로 생성하게 바꾸는거
  @PrimaryGeneratedColumn('uuid')
  // 자동으로 생성되는 PK컬럼 (uuid형식으로 만들어진다.)
  id: string;

  @Column({type:'varchar', unique:true, length:15})
  name: string;
}
