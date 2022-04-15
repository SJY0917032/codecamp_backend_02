import { Field, InputType } from '@nestjs/graphql';
import { Subscribe } from 'src/apis/subscribe/entities/subscribe.entity';
import { User } from 'src/apis/users/entities/user.entity';

@InputType()
export class CreatUserSubscribesInput {
  @Field(() => Subscribe)
  subscribeId: Subscribe;

  @Field(() => User)
  userId: User;
}
