import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';

@Injectable()
export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:
        '488967728040-b5dcgiek06ps332i87hk0rfqk71vldm8.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3001/login/google',
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
      age: 0,
    };
  }
}
