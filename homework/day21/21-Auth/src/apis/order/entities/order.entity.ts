import { UserSubscribe } from 'src/apis/userSubscribes/entities/usersubscribes.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum PaymentFormat {
    WAITING = 'waiting',
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
  


@Entity()
export class Order {
  // TODO : 함수로 U0001 이런식으로 생성하게 바꾸는거
  @PrimaryGeneratedColumn('uuid')
  // 자동으로 생성되는 PK컬럼 (uuid형식으로 만들어진다.)
  id: string;


  @JoinColumn()
  @OneToOne(() => UserSubscribe)
  usersubscribe = UserSubscribe
  
  @Column({
    type:'enum',
    enum:PaymentFormat,
    default: PaymentFormat.WAITING
  })
  payment: PaymentFormat

  @Column({
    type:'enum',
    enum:ShippingFormat,
    default: ShippingFormat.PREPARE
  })
  shipping: ShippingFormat

}
