import { Injectable,CACHE_MANAGER,Inject,UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
/**
 * Redis
 */
 import { Cache } from 'cache-manager';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'myAccessKey',
      passReqToCallback: true,
    }); // 검증부
  }

  // 검증이 완료되면 해당부분이 실행된다.
  async validate( req: any, payload: any, ) {

     const accessToken = req.headers.authorization.split(" ")

    const inRedisAccessToken = await this.cacheManager.get(`accessToken${accessToken[1]}`)

    if(inRedisAccessToken){
      throw new UnauthorizedException("이미 로그아웃된 유저입니다.")
    }

    await this.cacheManager.set(`accessToken${accessToken[1]}`, 'accessToken', {
      ttl: payload.exp,
    });
    
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      exp: payload.exp,
    };
  }
}
