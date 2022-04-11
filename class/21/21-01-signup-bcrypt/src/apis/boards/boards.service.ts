import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardService {
  // aaa(): string {
  //   return 'Hello World!';
  // }

  findAll() {
    // db에 접속후,
    // 데이터를 꺼내오는 로직
    return [
      {
        number: 1,
        writer: 'cheolsu',
        title: 'titles!',
        contents: "내용's",
      },
      {
        number: 2,
        writer: 'cheolsu',
        title: 'titles!',
        contents: "내용's",
      },
      {
        number: 3,
        writer: 'cheolsu',
        title: 'titles!',
        contents: "내용's",
      },
    ];
  }

  create() {
    // db에 접속후,
    // 데이터를 등록하는 로직
    return '등록 완료.';
  }
}
