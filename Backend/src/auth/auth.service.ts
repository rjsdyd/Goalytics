import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ message: string }> {
    const { email, password, nickname } = registerDto;

    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('이미 존재하는 이메일입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      email,
      nickname,
      password: '', // 엔티티 NotNull 제약조건 충족용 빈 문자열 할당
      password_hash: hashedPassword,
    });
    
    await this.userRepository.save(user);

    return { message: '회원가입이 성공적으로 완료되었습니다.' };
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string; nickname: string; role: string }> {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 일치하지 않습니다.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 일치하지 않습니다.');
    }

    // JWT 페이로드 (Role 기반 권한 제어 정보 포함)
    const payload = { 
      sub: user.id, 
      email: user.email, 
      nickname: user.nickname,
      role: user.role 
    };
    
    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
      nickname: user.nickname,
      role: user.role,
    };
  }
}