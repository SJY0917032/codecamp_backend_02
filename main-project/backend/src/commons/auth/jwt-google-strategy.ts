import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { config } from 'dotenv';

config();

@Injectable()
export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GoogleClientID,
      clientSecret: process.env.GoogleClientSecret,
      callbackURL: process.env.GoogleCallbackURL,
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
      email: profile.emails[0].value,
      password: '1111',
      name: profile.displayName,
      phone: '010-1111-1111',
    };
  }
}
