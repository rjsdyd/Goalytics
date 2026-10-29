import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // 1. 회원가입 (Register)
  async register(authDto: any): Promise<{ message: string }> {
    const { email, password, nickname } = authDto;

    // 이메일 중복 체크
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('이미 존재하는 이메일입니다.');
    }

    // 비밀번호 해싱
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 유저 생성 및 저장
    const user = this.userRepository.create({
      email,
      password_hash: hashedPassword,
      nickname,
    });
    
    await this.userRepository.save(user);

    return { message: '회원가입이 성공적으로 완료되었습니다.' };
  }

  // 2. 로그인 (Login)
  async login(authDto: any): Promise<{ access_token: string; nickname: string }> {
    const { email, password } = authDto;

    // 유저 검증
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 일치하지 않습니다.');
    }

    // 비밀번호 비교
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 일치하지 않습니다.');
    }

    // JWT 페이로드 구성 및 토큰 발급
    const payload = { sub: user.id, email: user.email, nickname: user.nickname };
    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
      nickname: user.nickname,
    };
  }
}