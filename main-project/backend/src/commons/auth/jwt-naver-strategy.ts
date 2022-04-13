import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-naver-v2';
import { config } from 'dotenv';

config();

@Injectable()
export class JwtNaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor() {
    super({
      clientID: process.env.NaverClientID,
      clientSecret: process.env.NaverClientSecret,
      callbackURL: process.env.NaverCallbackURL,
      scope: ['email', 'profile'],
    }); // 검증부
  }

  // 검증이 완료되면 해당부분이 실행된다.
  validate(
    accessToken: string, //
    refreshToken: string,
    profile: Profile,
  ) {
    console.log(accessToken);
    console.log(refreshToken);
    return {
      email: profile.email,
      password: '1111',
      name: profile.name,
      phone: '010-2222-1111',
    };
  }
}
