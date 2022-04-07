import { Column, Entity,  ManyToOne,  PrimaryGeneratedColumn } from 'typeorm';
import { Notice } from './notice.entity';

@Entity()
export class NoticeImg {
  // TODO : 함수로 U0001 이런식으로 생성하게 바꾸는거
  @PrimaryGeneratedColumn('uuid')
  // 자동으로 생성되는 PK컬럼 (uuid형식으로 만들어진다.)
  id: string;

  @ManyToOne(() => Notice)
  notice: Notice

  @Column({type: 'varchar', nullable:false, default:500})
  url : string

}
