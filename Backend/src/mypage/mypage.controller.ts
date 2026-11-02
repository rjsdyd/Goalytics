// src/mypage/mypage.controller.ts
import { Controller, Get, Post, Delete, Body } from '@nestjs/common';
import { MyPageService } from './mypage.service.js';

@Controller('mypage')
export class MyPageController {
  constructor(private readonly mypageService: MyPageService) {}

  @Get('profile')
  getProfile() {
    return this.mypageService.getProfile(1);
  }

  @Get('favorites/teams')
  getFavoriteTeams() {
    return this.mypageService.getFavoriteTeams(1);
  }

  @Get('favorites/nations')
  getFavoriteNations() {
    return this.mypageService.getFavoriteNations(1);
  }

  @Post('favorites/teams')
  toggleFavoriteTeam(@Body() body: any) {
    return this.mypageService.toggleFavoriteTeam(1, body);
  }

  @Post('favorites/nations')
  toggleFavoriteNation(@Body() body: any) {
    return this.mypageService.toggleFavoriteNation(1, body);
  }

  // 💡 탈퇴 API 라우트 추가
  @Delete('withdraw')
  withdraw() {
    return this.mypageService.withdraw(1);
  }
}