import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { isEnumType } from 'graphql';
import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';



export enum RolesFormat {
  USER = 'user',
  ADMIN = 'admin'
}
registerEnumType(RolesFormat, {
  name: 'RolseFormat'
})


@Entity()
@ObjectType()
export class User {
  // TODO : 함수로 U0001 이런식으로 생성하게 바꾸는거
  @PrimaryGeneratedColumn('uuid')
  // 자동으로 생성되는 PK컬럼 (uuid형식으로 만들어진다.)
  @Field(() => String)
  id: string;

  @Column({type:'varchar', length:100, unique:true})
  @Field(() => String)
  email: string;

  @Column({type:'varchar', length:20, nullable:false})
  @Field(() => Int)
  password: number;

  @Column({type: 'varchar', length:30, nullable:false})
  @Field(() => String)
  name: string;

  @Column({type: 'varchar', length:13, unique:true})
  @Field(() => String)
  phone: string;

  @Column({
    type:'enum',
    enum:RolesFormat,
    default: RolesFormat.USER
  })
  @Field(() => RolesFormat)
  roles: RolesFormat

  @DeleteDateColumn()
  @Field(() => Date, { nullable: true })
  deletedAt: Date;
}
