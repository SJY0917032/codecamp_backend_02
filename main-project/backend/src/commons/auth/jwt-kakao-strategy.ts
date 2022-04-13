import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-kakao';
import { config } from 'dotenv';

config();

@Injectable()
export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KakaoClientID,
      callbackURL: process.env.KakaoCallbackURL,
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
    const profileJson = profile._json;
    const kakao = profileJson.kakao_account;
    console.log(kakao);
    return {
      email: kakao.email,
      password: '1111',
      name: kakao.profile.nickname,
      phone: '010-5678-9932',
    };
  }
}
