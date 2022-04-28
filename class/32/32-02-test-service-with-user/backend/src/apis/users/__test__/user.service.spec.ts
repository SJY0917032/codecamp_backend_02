import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserService } from '../user.service';
import { ConflictException } from '@nestjs/common';

class MockUserRepository {
  mydb = [
    {
      email: 'a@a.com',
      password: '0000',
      name: 'Jangu',
      age: 8,
    },
    {
      email: 'b@b.com',
      password: '0000',
      name: 'Cheolsu',
      age: 13,
    },
    {
      email: 'c@c.com',
      password: '0000',
      name: 'ChamEsol',
      age: 11,
    },
  ];

  findOne({ email }) {
    const users = this.mydb.filter((e) => {
      e.email === email;
    });

    return users.length > 0 ? users[0] : null;
  }

  save({ email, password, name, age }) {
    this.mydb.push({ email, password, name, age });
    return { email, password, name, age };
  }
}

describe('User Service Test', () => {
  let userService: UserService;

  beforeEach(async () => {
    const userModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: MockUserRepository,
        },
      ],
    }).compile();

    userService = userModule.get<UserService>(UserService);
  });

  describe('create', () => {
    it('이미 존재하는 이메일 검증', async () => {
      const myData = {
        email: 'a@a.com',
        hashedPassword: '1234',
        name: 'Cheolsu',
        age: 11,
      };
      try {
        await userService.create({
          ...myData,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }
    });

    it('회원 등록 테스트', async () => {
      const myData = {
        email: 'aaa@aaa.com',
        hashedPassword: '1234',
        name: 'geuGu',
        age: 15,
      };
      const myResultData = {
        email: 'aaa@aaa.com',
        password: '1234',
        name: 'geuGu',
        age: 15,
      };
      const result = await userService.create({
        ...myData,
      });
      // 테스트에서 객체비교
      expect(result).toStrictEqual(myResultData);
    });
  });
  describe('findOne', () => {
    //
  });
});
