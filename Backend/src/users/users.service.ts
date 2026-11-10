import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAllUsers() {
    return this.userRepository.find({
      select: {
        id: true,
        email: true,
        nickname: true,
        role: true,
        created_at: true,
      },
      order: { created_at: 'DESC' },
    });
  }

  async deleteUser(id: number) {
    await this.userRepository.delete(id);
    return { message: '유저가 성공적으로 삭제되었습니다.' };
  }
  
  async updateRole(id: number, role: string) {
    await this.userRepository.update(id, { role });
    return { message: '유저 권한이 변경되었습니다.' };
  }
}