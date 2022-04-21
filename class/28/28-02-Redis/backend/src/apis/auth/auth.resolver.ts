import { UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.parm';
import { GqlAuthRefreshGuard } from 'src/commons/auth/gql-auth.guard';

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
    @Context() context: any,
  ) {
    // 1. 로그인을한다.(이메일과 비밀번호가 일치하는 유저)
    const user = await this.userService.findOne({ email });
    // 2. 일치하는 유저가 없다면 에러 넘기기.
    if (!user)
      throw new UnprocessableEntityException('해당하는 유저가 없습니다.');
    // 3. 일치하는 유저가 있다면 비밀번호확인후 아니라면 에러
    const isAuth = await bcrypt.compare(password, user.password);

    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');

    // 4. refreshToken(JWT)를 만들어 FE(cookie)로 보내준다
    this.authService.setRefreshToken({ user, res: context.res });

    // 5. 유저가 맞다면 JWT를 던져준다.
    return this.authService.getAccessToken({ user });
  }

  // 리프레쉬 토큰을 검증한다.
  // 검증이끝나면 값을 넣어준다
  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String)
  restoreAccessToken(
    @CurrentUser() currentUser: ICurrentUser, //
  ) {
    return this.authService.getAccessToken({ user: currentUser });
  }

}
