import { Injectable } from '@nestjs/common';

@Injectable()
export class StarBucksService {
  // aaa(): string {
  //   return 'Hello World!';
  // }

  findAll() {
    // db에 접속후,
    // 데이터를 꺼내오는 로직
    return [
      {
        name: '제주 유기농 말차로 만든 크림 프라푸치노',
        price: 6300,
        kcal: 230,
        fat: 7,
        protein: 5,
        sodium: 150,
        sugars: 28,
        caffeine: 60,
      },
      {
        name: '자바 칩 프라푸치노',
        price: 6100,
        kcal: 340,
        fat: 9,
        protein: 6,
        sodium: 180,
        sugars: 42,
        caffeine: 100,
      },
      {
        name: '제주 비자림 콜드 브루',
        price: 6800,
        kcal: 340,
        fat: 8,
        protein: 10,
        sodium: 140,
        sugars: 43,
        caffeine: 105,
      },
      {
        name: '아이스 제주 유기농 말차로 만든 라떼',
        price: 6100,
        kcal: 155,
        fat: 4,
        protein: 6,
        sodium: 95,
        sugars: 16,
        caffeine: 60,
      },
      {
        name: '제주 쑥떡 크림 프라푸치노',
        price: 7500,
        kcal: 460,
        fat: 10,
        protein: 8,
        sodium: 250,
        sugars: 57,
        caffeine: 0,
      },
    ];
  }

  create() {
    // db에 접속후,
    // 데이터를 등록하는 로직
    return '등록 완료.';
  }
}
