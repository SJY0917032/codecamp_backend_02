import { InputType, OmitType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class CreateUserInput extends OmitType(
  User, // 참조할 엔티티
  ['id'], // 뺄 컬럼
  InputType, // 무엇으로 쓸것인가?
) {}
