import { HttpException, ExceptionFilter, Catch } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException) {
    // 무슨상태인지
    const status = exception.getStatus();
    // 에러메시지
    const message = exception.message;
    console.log('****************************');
    console.log(`${message}가 발생했습니다. 코드는 ${status}`);
    console.log('****************************');
  }
}
