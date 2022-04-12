import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

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
  constructor() {
    super({
      jwtFromRequest: (req) => {
        return getCookieValue(req.headers.cookie, 'refreshToken');
      },
      secretOrKey: 'myRefreshKey',
    }); // 검증부
  }

  // 검증이 완료되면 해당부분이 실행된다.
  validate(payload: any) {
    console.log(payload);
    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}
