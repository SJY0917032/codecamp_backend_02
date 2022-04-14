import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

import { UserSubscribe } from 'src/apis/userSubscribes/entities/usersubscribes.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum PaymentFormat {
  PROCESSING = 'processing',
  COMPLETE = 'complete',
  CANCEL = 'cancel',
}

export enum ShippingFormat {
  PREPARE = 'prepare',
  CARGO = 'cargo',
  OTW = 'otw',
  COMPLETE = 'complete',
  CANCEL = 'cancel',
}

registerEnumType(PaymentFormat, {
  name: 'PaymentFormat',
});
registerEnumType(ShippingFormat, {
  name: 'ShippingFormat',
});

@Entity()
@ObjectType()
export class Order {
  // TODO : 함수로 U0001 이런식으로 생성하게 바꾸는거
  @PrimaryGeneratedColumn('uuid')
  // 자동으로 생성되는 PK컬럼 (uuid형식으로 만들어진다.)
  @Field(() => String)
  id: string;

  @JoinColumn()
  @OneToOne(() => UserSubscribe)
  @Field(() => UserSubscribe)
  userSubscribe: UserSubscribe;

  @Column()
  @Field(() => String)
  impUid: string;

  @Column({
    type: 'enum',
    enum: PaymentFormat,
    default: PaymentFormat.PROCESSING,
  })
  @Field(() => PaymentFormat, { nullable: true })
  payment: PaymentFormat;

  @CreateDateColumn()
  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: ShippingFormat,
    default: ShippingFormat.PREPARE,
  })
  @Field(() => ShippingFormat, { nullable: true })
  shipping: ShippingFormat;
}
