import { User } from '../users/entities/user.entity';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserInput } from '../users/dto/createUserInput';
import { AuthGuard } from '@nestjs/passport';
import { v4 } from 'uuid';

interface IOAuthUser {
  user: Pick<User, 'email' | 'password' | 'name' | 'phone'>;
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
    let user = await this.userService.findOne({ email: req.user.email });

    if (!user) {
      const createUser = new CreateUserInput();
      createUser.email = req.user.email;
      createUser.name = req.user.name;
      createUser.password = req.user.password;
      createUser.phone = req.user.phone;

      const paymentId = v4();
      createUser.payment = { id: paymentId, name: 'none' };

      user = await this.userService.create({ createUserInput: createUser });
    }

    // 로그인
    this.authService.setRefreshToken({ user, res });
    res.redirect(
      'http://localhost:5500/main-project/frontend/login/index.html',
    );
  }
}
