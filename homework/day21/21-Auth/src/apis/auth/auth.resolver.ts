import { UnprocessableEntityException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => String)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    // 1. 로그인을한다.(이메일과 비밀번호가 일치하는 유저)
    const user = await this.userService.findOne({ email });
    // 2. 일치하는 유저가 없다면 에러 넘기기.
    if (!user)
      throw new UnprocessableEntityException('해당하는 유저가 없습니다.');
    // 3. 일치하는 유저가 있다면 비밀번호확인후 아니라면 에러
    const isAuth = await bcrypt.compare(password, user.password);

    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');

    // 4. 유저가 맞다면 JWT를 던져준다.
    return this.authService.getAccessToken({ user });
  }
}
