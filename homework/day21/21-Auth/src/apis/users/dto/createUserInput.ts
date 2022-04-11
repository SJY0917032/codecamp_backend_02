import { Field, InputType, OmitType, registerEnumType } from "@nestjs/graphql";
import { CreatePaymentInput } from "src/apis/payments/dto/createPayementInput";
import { Payment } from "src/apis/payments/entities/payment.entity";
import { User, RolesFormat } from "../entities/user.entity";


registerEnumType(RolesFormat, {
    name: 'RolseFormat'
  })
  
@InputType()
export class CreateUserInput{
    @Field(() => String)
    email: string

    @Field(() => String)
    name: string

    @Field(() => String)
    phone: string;

    @Field(() => String)
    password: string;

    @Field(() => CreatePaymentInput)
    payment: Payment

    @Field(() => RolesFormat)
    roles: RolesFormat
}