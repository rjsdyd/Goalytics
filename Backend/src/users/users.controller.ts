import { Controller, Get, Delete, Param, Headers, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { Patch, Body } from '@nestjs/common'; // 상단 import에 Patch, Body가 없다면 추가

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 💡 JWT 토큰 디코딩 헬퍼 함수
  private extractTokenPayload(authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('로그인 토큰이 없습니다.');
    }
    const token = authHeader.split(' ')[1];
    try {
      const payloadBase64 = token.split('.')[1];
      const decodedJson = Buffer.from(payloadBase64, 'base64').toString('utf8');
      return JSON.parse(decodedJson);
    } catch (error) {
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }
  }

  // API: 전체 유저 목록 조회
  @Get()
  getAllUsers(@Headers('authorization') authHeader: string) {
    const payload = this.extractTokenPayload(authHeader);
    
    // 관리자 권한 검증
    if (payload.role !== 'admin') {
      throw new UnauthorizedException('관리자 권한이 필요합니다.');
    }
    return this.usersService.findAllUsers();
  }

  // API: 특정 유저 강제 탈퇴
  @Delete(':id')
  deleteUser(@Headers('authorization') authHeader: string, @Param('id') id: number) {
    const payload = this.extractTokenPayload(authHeader);
    
    // 관리자 권한 검증
    if (payload.role !== 'admin') {
      throw new UnauthorizedException('관리자 권한이 필요합니다.');
    }
    return this.usersService.deleteUser(id);
  }

  // API: 특정 유저 권한 변경
  @Patch(':id/role')
  updateRole(@Headers('authorization') authHeader: string, @Param('id') id: number, @Body('role') role: string) {
    const payload = this.extractTokenPayload(authHeader);
    if (payload.role !== 'admin') {
      throw new UnauthorizedException('관리자 권한이 필요합니다.');
    }
    return this.usersService.updateRole(id, role);
  }
}