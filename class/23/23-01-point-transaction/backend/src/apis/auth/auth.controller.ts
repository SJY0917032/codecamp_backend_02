import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/entities/user.entity';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

interface IOAuthUser {
  user: Pick<User, 'email' | 'password' | 'name' | 'age'>;
}

@Controller()
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get('/login/google')
  @UseGuards(AuthGuard('google'))
  async loginGoogle(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    // 가입 확인
    let user = await this.userService.findOne({ email: req.user.email });

    // 회원가입
    if (!user) {
      const { password, ...rest } = req.user;
      const createUser = { ...rest, hashedPassword: password };
      user = await this.userService.create({ ...createUser });
    }

    // 로그인
    this.authService.setRefreshToken({ user, res });
    res.redirect(
      'http://localhost:5500/class/22/22-03-login-google/frontend/social-login.html',
    );
  }
}
