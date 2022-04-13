import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtGoogleStrategy } from 'src/commons/auth/jwt-google-strategy';
import { JwtKakaoStrategy } from 'src/commons/auth/jwt-kakao-strategy';
import { JwtNaverStrategy } from 'src/commons/auth/jwt-naver-strategy';
import { JwtRefreshStrategy } from 'src/commons/auth/jwt-refresh.strategy';
import { Payment } from '../payments/entities/payment.entity';
import { User } from '../users/entities/user.entity';
import { UserService } from '../users/user.service';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({}), //
    TypeOrmModule.forFeature([User, Payment]),
  ],
  providers: [
    JwtKakaoStrategy,
    JwtNaverStrategy,
    JwtGoogleStrategy,
    JwtRefreshStrategy,
    AuthResolver, //
    AuthService,
    UserService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
