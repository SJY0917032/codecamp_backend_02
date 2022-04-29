import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { config } from "dotenv"


@Injectable()
export class JWtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_TOKEN_KEY,
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
