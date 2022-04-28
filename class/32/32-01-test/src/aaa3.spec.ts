// Controller Test
import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

class MockAppService {
  getHello() {
    return 'Hello World!';
  }
}

describe('AppController Test', () => {
  let appController: AppController;

  // 직접 의존성을 주입해서 사용한다.
  beforeEach(async () => {
    const appModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          // 앱서비스만 이걸로 바꾼다.
          useClass: MockAppService,
        },
      ],
    }).compile();

    appController = appModule.get<AppController>(AppController);
  });

  describe('getHello?', () => {
    it('이 테스트의 검증 결과는 Hello World를 리턴합니다.', () => {
      const result = appController.getHello();
      expect(result).toBe('Hello World!');
    });
  });
});
