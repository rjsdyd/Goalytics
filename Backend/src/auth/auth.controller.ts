import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: any) {
    // 실무에서는 DTO 클래스와 class-validator를 사용해 body를 검증합니다.
    return this.authService.register(body);
  }

  @HttpCode(HttpStatus.OK) // 로그인은 201 Created가 아닌 200 OK 반환이 표준입니다.
  @Post('login')
  async login(@Body() body: any) {
    return this.authService.login(body);
  }
}