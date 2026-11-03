import { Controller, Get, Post, Delete, Body, Headers, UnauthorizedException } from '@nestjs/common';
import { MyPageService } from './mypage.service.js';

@Controller('mypage')
export class MyPageController {
  constructor(private readonly mypageService: MyPageService) {}

  private getUserIdFromToken(authHeader: string): number {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('로그인 토큰이 없습니다.');
    }
    const token = authHeader.split(' ')[1];
    try {
      const payloadBase64 = token.split('.')[1];
      const decodedJson = Buffer.from(payloadBase64, 'base64').toString('utf8');
      const payload = JSON.parse(decodedJson);
      return payload.sub; 
    } catch (error) {
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }
  }

  @Get('profile')
  getProfile(@Headers('authorization') authHeader: string) {
    const userId = this.getUserIdFromToken(authHeader);
    return this.mypageService.getProfile(userId);
  }

  @Get('favorites/teams')
  getFavoriteTeams(@Headers('authorization') authHeader: string) {
    const userId = this.getUserIdFromToken(authHeader);
    return this.mypageService.getFavoriteTeams(userId);
  }

  @Get('favorites/nations')
  getFavoriteNations(@Headers('authorization') authHeader: string) {
    const userId = this.getUserIdFromToken(authHeader);
    return this.mypageService.getFavoriteNations(userId);
  }

  @Post('favorites/teams')
  toggleFavoriteTeam(@Headers('authorization') authHeader: string, @Body() body: any) {
    const userId = this.getUserIdFromToken(authHeader);
    return this.mypageService.toggleFavoriteTeam(userId, body);
  }

  @Post('favorites/nations')
  toggleFavoriteNation(@Headers('authorization') authHeader: string, @Body() body: any) {
    const userId = this.getUserIdFromToken(authHeader);
    return this.mypageService.toggleFavoriteNation(userId, body);
  }

  @Delete('withdraw')
  withdraw(@Headers('authorization') authHeader: string) {
    const userId = this.getUserIdFromToken(authHeader);
    return this.mypageService.withdraw(userId);
  }
}