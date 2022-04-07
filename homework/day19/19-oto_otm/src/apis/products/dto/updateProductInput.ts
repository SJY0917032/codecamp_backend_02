import { InputType, PartialType } from '@nestjs/graphql';
import { CreateProductInput } from './createProductInput';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {}

//  업데이트 관련한 DTO는
// Create의것을 PartialType으로 가져와서
// Nullable한 수정이 가능해진다.

// OmitType => 뺄타입만 골라서 가져올수있다.
// PickType => 말그대로 골라서 타입을 가져올수있다.
