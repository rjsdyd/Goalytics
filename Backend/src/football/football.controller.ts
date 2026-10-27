import { Controller, Get } from '@nestjs/common';
import { FootballService } from './football.service.js'; // .js 필수

@Controller('football')
export class FootballController {
  constructor(private readonly footballService: FootballService) {}

  @Get('save-leagues') // 데이터 갱신 및 저장
  async saveLeagues() {
    return await this.footballService.fetchAndSaveLeagues();
  }

  @Get('leagues') // 저장된 데이터 조회 (새로 추가됨)
  async getLeagues() {
    return await this.footballService.getSavedLeagues();
  }
}