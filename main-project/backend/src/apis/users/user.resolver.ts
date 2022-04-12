import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/commons/auth/gql-user.parm';
import { CreateUserInput } from './dto/createUserInput';
import { UpdateUserInput } from './dto/updateUserInput';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async fetchUsers() {
    return await this.userService.findAll();
  }
  @Query(() => [User])
  async fetchUsersWithDeleted() {
    return await this.userService.findAllWithDeleted();
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => User)
  async fetchUser(@Args('userId') userId: string) {
    return await this.userService.find({ userId });
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.create({ createUserInput });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => User)
  async updateUser(
    @Args('userId') userId: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    await this.userService.checkIsDeleted({ userId });
    return await this.userService.update({ userId, updateUserInput });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async restoreUser(
    @Args('userId') userId: string, //
  ) {
    return await this.userService.restore({ userId });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async deleteUser(
    @Args('userId') userId: string, //
  ) {
    return await this.userService.delete({ userId });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async deleteUserWithToken(
    @CurrentUser() currentUser: any, //
  ) {
    const userId = currentUser.id;
    console.log(`${currentUser.email}님의 계정이 삭제됩니다!`);
    return await this.userService.delete({ userId });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => User)
  async updatePassword(
    @CurrentUser() currentUser: any,
    @Args('password') password: string, //
  ) {
    const email = currentUser.email;
    return await this.userService.updatePassword({ email, password });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => String)
  async fetchUserAccessToken(
    @CurrentUser() currentUser: any, //
  ) {
    const email = currentUser.email;
    const name = currentUser.name;
    return `${name}님 안녕하세요 email은 ${email}입니다`;
  }
}
