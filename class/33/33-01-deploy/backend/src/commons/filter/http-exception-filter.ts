import { HttpException, ExceptionFilter, Catch } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException) {
    // 무슨상태인지
    const status = exception.getStatus();
    // 에러메시지
    const message = exception.message;
    const eDate = new Date()
    const returnDate = `${eDate.getFullYear()}-${eDate.getMonth()+1}-${eDate.getDate()}`
    const returnTime = `${eDate.getHours()}:${eDate.getMinutes()}:${eDate.getSeconds()}`


    console.log('🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧');
    console.log(`🚀${message}가 발생했습니다. 코드는 ${status} 발생일자 : ${returnDate} 발생시간 : ${returnTime}`);
    console.log('🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧');
  }
}
