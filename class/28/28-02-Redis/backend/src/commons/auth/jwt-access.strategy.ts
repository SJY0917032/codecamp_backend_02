import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JWtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'myAccessKey',
    }); // 검증부
  }

  // 검증이 완료되면 해당부분이 실행된다.
  validate(payload: any) {

    /**
     * 1. 여기서 redis를 통해서 저장하고 (jwt를)
     * 2. redis에서 ttl을건다.
     * 3. 만약 로그아웃을한다면 redis에서 token을 제거한다.
     */

    console.log(payload);
    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}
