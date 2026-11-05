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

  // 관리자: 전체 유저 목록 조회 (비밀번호 제외)
  async findAllUsers() {
    return this.userRepository.find({
      // 💡 배열 대신 객체 형태로 컬럼 선택 (TypeORM 0.3.x 호환)
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

  // 관리자: 특정 유저 강제 탈퇴(삭제)
  async deleteUser(id: number) {
    await this.userRepository.delete(id);
    return { message: '유저가 성공적으로 삭제되었습니다.' };
  }
  
  async updateRole(id: number, role: string) {
    await this.userRepository.update(id, { role });
    return { message: '유저 권한이 변경되었습니다.' };
  }
}

