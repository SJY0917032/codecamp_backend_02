import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from '../users/dto/createUserInput';
import { UserService } from '../users/user.service';
import { v4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, //
    private readonly userService: UserService,
  ) {}
  getAccessToken({ user }) {
    const accessToken = this.jwtService.sign(
      { email: user.email, sub: user.id, name: user.name },
      { secret: 'myAccessKey', expiresIn: '50m' },
    );
    return accessToken;
  }

  setRefreshToken({ user, res }) {
    const RefreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: 'myRefreshKey', expiresIn: '1w' },
    );
    // development Setting
    res.setHeader('Set-Cookie', `refreshToken=${RefreshToken}; path=/;`);

    // deploy Setting
    // res.setHeader('Access-Control-Allow-Origin', 'https://myfrontsite.com')
    // res.setHeader(
    //   'Set-Cookie',
    //   `refreshToken=${refreshToken}; path=/; domain=.mybacksite.com; SameSite=None; Secure; httpOnly;`
    // )
  }

  async socialLogin(req, res) {
    let user = await this.userService.findOne({ email: req.user.email });
    if (!user) {
      const createUser = new CreateUserInput();
      createUser.email = req.user.email;
      createUser.name = req.user.name;
      createUser.password = req.user.password;
      createUser.phone = req.user.phone;

      // 1:1관계의 결제테이블
      // id값을 직접생성해서 넣어준다
      const paymentId = v4();
      createUser.payment = { id: paymentId, name: 'none' };

      user = await this.userService.create({ createUserInput: createUser });
    }
    // 로그인
    this.setRefreshToken({ user, res });
    res.redirect(
      302,
      'http://localhost:5500/main-project/frontend/login/index.html',
    );
  }
}
