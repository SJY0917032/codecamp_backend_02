import { InputType, OmitType } from "@nestjs/graphql";
import { Payment } from "../entities/payment.entity";


@InputType()
export class CreatePaymentInput extends OmitType(
    Payment,
    ['id'],
    InputType
){}