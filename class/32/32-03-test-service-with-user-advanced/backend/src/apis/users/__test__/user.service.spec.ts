import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserService } from '../user.service';
import { ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';

class MockUserRepository {
  mydb = [
    {
      email: 'a@a.com',
      password: '0000',
      name: 'Jangu',
      age: 8,
    },
  ];
  findOne({ email }) {
    return this.mydb.find((e) => e.email === email);
  }
  save({ email, password, name, age }) {
    this.mydb.push({ email, password, name, age });
    return { email, password, name, age };
  }
}

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('User Service Test', () => {
  let userService: UserService;
  let userRepository: MockRepository<User>;

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
    userRepository = userModule.get<MockRepository<User>>(
      getRepositoryToken(User),
    );
  });

  describe('create', () => {
    it('이미 존재하는 이메일 검증', async () => {
      const userRepositorySpyFindOne = jest.spyOn(userRepository, 'findOne');
      const userRepositorySpySave = jest.spyOn(userRepository, 'save');
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
      expect(userRepositorySpyFindOne).toBeCalledTimes(1);
      expect(userRepositorySpySave).toBeCalledTimes(0);
    });

    it('회원 등록 테스트', async () => {
      const userRepositorySpyFindOne = jest.spyOn(userRepository, 'findOne');
      const userRepositorySpySave = jest.spyOn(userRepository, 'save');
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
      expect(userRepositorySpyFindOne).toBeCalledTimes(1);
      expect(userRepositorySpySave).toBeCalledTimes(1);
    });
  });
  describe('findOne', () => {
    //
  });
});
