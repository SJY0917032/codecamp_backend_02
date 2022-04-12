import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser } from 'src/commons/auth/gql-user.parm';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService, //
  ) {}

  @Mutation(() => User)
  async createUser(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('name') name: string,
    @Args('age') age: number,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return this.userService.create({
      email,
      hashedPassword,
      name,
      age,
    });
  }

  // @UseGuards(AuthGuard('aaa')) // Rest API를 사용하는경우.
  @UseGuards(GqlAuthAccessGuard)
  @Query(() => String)
  async fetchUser(
    @CurrentUser() currentUser: any, //
  ) {
    return currentUser;
  }
}
