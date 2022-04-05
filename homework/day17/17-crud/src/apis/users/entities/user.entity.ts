import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


export enum RolesFormat {
  USER = 'user',
  ADMIN = 'admin'
}

@Entity()
export class User {
  // TODO : 함수로 U0001 이런식으로 생성하게 바꾸는거
  @PrimaryGeneratedColumn('uuid')
  // 자동으로 생성되는 PK컬럼 (uuid형식으로 만들어진다.)
  id: string;

  @Column({type:'varchar', length:100, unique:true})
  email: string;

  @Column({type:'varchar', length:20, nullable:false})
  password: number;

  @Column({type: 'varchar', length:30, nullable:false})
  name: string;

  @Column({type: 'varchar', length:13, unique:true})
  phone: string;

  @Column({
    type:'enum',
    enum:RolesFormat,
    default: RolesFormat.USER
  })
  roles: RolesFormat
}
