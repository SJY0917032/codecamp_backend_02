import { Injectable,CACHE_MANAGER,Inject,UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
/**
 * Redis
 */
 import { Cache } from 'cache-manager';
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

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache
  ) {
    super({
      jwtFromRequest: (req) => {
        return getCookieValue(req.headers.cookie, 'refreshToken');
      },
      secretOrKey: 'myRefreshKey',
      passReqToCallback: true,
    }); // 검증부
  }

  // 검증이 완료되면 해당부분이 실행된다.
  async validate(req:any, payload: any) {
    
    const refreshToken = getCookieValue(
      req.headers.cookie,
      'refreshToken',
    );

  
    const inRedisRefreshToken = await this.cacheManager.get(
      `refreshToken$${refreshToken}`,
    );

    if(inRedisRefreshToken){
      throw new UnauthorizedException("이미 로그아웃된 유저입니다.")
    }

    return {
      email: payload.email,
      id: payload.sub,
      name: payload.name,
    };
  }
}
