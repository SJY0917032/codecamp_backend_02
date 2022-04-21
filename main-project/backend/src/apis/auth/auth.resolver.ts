import {
  CACHE_MANAGER,
  UnprocessableEntityException,
  UseGuards,
  Inject,
} from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import {
  GqlAuthAccessGuard,
  GqlAuthRefreshGuard,
} from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.parm';
import * as jwt from 'jsonwebtoken';

/**
 * Redis
 */
import { Cache } from 'cache-manager';
import internal from 'stream';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @Mutation(() => String)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
    @Context() context: any,
  ) {
    console.log(context.res);
    // 1. 로그인을한다.(이메일과 비밀번호가 일치하는 유저)
    const user = await this.userService.findOne({ email });
    // 2. 일치하는 유저가 없다면 에러 넘기기.
    if (!user)
      throw new UnprocessableEntityException('해당하는 유저가 없습니다.');
    // 3. 일치하는 유저가 있다면 비밀번호확인후 아니라면 에러
    const isAuth = await bcrypt.compare(password, user.password);

    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');

    // 4. refreshToken(JWT)를 만들어서 FE(Cookie)에 세팅한다.
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

  // LogOut
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  async logOut(
    @Context() context: any, //
  ) {
    const accessToken = context.req.headers.authorization.split(' ');
    const refreshToken = getCookieValue(
      context.req.headers.cookie,
      'refreshToken',
    );

    try {
      const decodeAccessToken = await new Promise((resolve, reject) => {
        jwt.verify(accessToken[1], 'myAccessKey', (err, decoded) => {
          if (err) {
            reject(err);
          } else {
            resolve(decoded);
          }
        });
      });
      const decodeRefreshToken = await new Promise((resolve, reject) => {
        jwt.verify(refreshToken, 'myRefreshKey', (err, decoded) => {
          if (err) {
            reject(err);
          } else {
            resolve(decoded);
          }
        });
      });
    } catch (error) {
      console.error('에러가났는데용');
    }

    await this.cacheManager.set(`accessToken${accessToken[1]}`, 'accessToken', {
      ttl: 0,
    });
    await this.cacheManager.set(
      `refreshToken$${refreshToken}`,
      'refreshToken',
      {
        ttl: 0,
      },
    );

    const inRedisAccessToken = await this.cacheManager.get(
      `accessToken${accessToken[1]}`,
    );
    const inRedisRefreshToken = await this.cacheManager.get(
      `refreshToken$${refreshToken}`,
    );

    return '로그아웃에 성공했습니다.';
  }
}

const getCookieValue = (cookie = '', key: string) => {
  const cookieKey = key + '=';
  let result = '';
  const cookieArr = cookie.split(';');

  for (let i = 0; i < cookieArr.length; i++) {
    if (cookieArr[i][0] === ' ') {
      cookieArr[i] = cookieArr[i].substring(1);
    }

    if (cookieArr[i].indexOf(cookieKey) === 0) {
      result = cookieArr[i].slice(cookieKey.length, cookieArr[i].length);
      return result;
    }
  }
  return result;
};
