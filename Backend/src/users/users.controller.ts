import { Controller, Get, Delete, Param, Headers, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { Patch, Body } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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

  @Get()
  getAllUsers(@Headers('authorization') authHeader: string) {
    const payload = this.extractTokenPayload(authHeader);
    
    if (payload.role !== 'admin') {
      throw new UnauthorizedException('관리자 권한이 필요합니다.');
    }
    return this.usersService.findAllUsers();
  }

  @Delete(':id')
  deleteUser(@Headers('authorization') authHeader: string, @Param('id') id: number) {
    const payload = this.extractTokenPayload(authHeader);
    
    if (payload.role !== 'admin') {
      throw new UnauthorizedException('관리자 권한이 필요합니다.');
    }
    return this.usersService.deleteUser(id);
  }

  @Patch(':id/role')
  updateRole(@Headers('authorization') authHeader: string, @Param('id') id: number, @Body('role') role: string) {
    const payload = this.extractTokenPayload(authHeader);
    if (payload.role !== 'admin') {
      throw new UnauthorizedException('관리자 권한이 필요합니다.');
    }
    return this.usersService.updateRole(id, role);
  }
}