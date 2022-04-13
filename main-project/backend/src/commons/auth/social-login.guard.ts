import { AuthGuard } from '@nestjs/passport';

export class socialGuard extends AuthGuard(['google', 'naver', 'kakao']){
    
}