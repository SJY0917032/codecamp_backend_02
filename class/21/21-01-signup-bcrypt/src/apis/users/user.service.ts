import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create({ email, hashedPassword: password, name, age }) {
    const user = await this.userRepository.findOne({
      email: email,
    });

    if (user) {
      throw new ConflictException(
        '유저 이메일이 이미 등록돼있습니다! 다른이메일을 등록하세요!',
      );
    }

    return await this.userRepository.save({
      email,
      password,
      name,
      age,
    });
  }
}
