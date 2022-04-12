import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  getAccessToken({ user }) {
    const accessToken = this.jwtService.sign(
      { email: user.email, sub: user.id , name : user.name},
      { secret: 'myAccessKey', expiresIn: '2m' },
    );
    return accessToken;
  }

  setRefreshToken({ user, res }) {
    const RefreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: 'myRefreshKey', expiresIn: '1w' },
    );
    // development Setting
    res.setHeader('Set-Cookie', `refreshToken=${RefreshToken}`);

    // deploy Setting
    // res.setHeader('Access-Control-Allow-Origin', 'https://myfrontsite.com')
    // res.setHeader(
    //   'Set-Cookie',
    //   `refreshToken=${refreshToken}; path=/; domain=.mybacksite.com; SameSite=None; Secure; httpOnly;`
    // )
  }
}
