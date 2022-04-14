import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { CreatUserSubscribesInput } from 'src/apis/userSubscribes/dto/createUserSubscribesInput';
import { UserSubscribe } from 'src/apis/userSubscribes/entities/usersubscribes.entity';
import { PaymentFormat, ShippingFormat } from '../entities/order.entity';

registerEnumType(PaymentFormat, {
  name: 'PaymentFormat',
});
registerEnumType(ShippingFormat, {
  name: 'ShippingFormat',
});

@InputType()
export class CreateOrderInput {
  @Field(() => CreatUserSubscribesInput)
  userSubscribe: CreatUserSubscribesInput;

  @Field(() => String)
  impUid: string;
}
