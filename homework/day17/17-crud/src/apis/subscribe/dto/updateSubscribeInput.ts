import { InputType,  PartialType } from '@nestjs/graphql';
import { CreateSubscribeInput } from './createSubscribeInput';

@InputType()
export class UpdateSubscribeInput extends PartialType(CreateSubscribeInput) {
}
