import { Controller, Get, Post, Query } from '@nestjs/common';
import { FootballService } from './football.service.js';

@Controller('football')
export class FootballController {
  constructor(private readonly footballService: FootballService) {}

  @Post('leagues/sync')
  async syncLeagues() {
    return await this.footballService.fetchAndSaveLeagues();
  }

  @Get('leagues')
  async getLeagues() {
    return await this.footballService.getSavedLeagues();
  }

  @Get('fixtures')
  async getFixtures() {
    return await this.footballService.getSavedFixtures();
  }

  // 브라우저에서 이 주소로 접속하면 5년치 데이터를 긁어옵니다. (시간이 조금 걸릴 수 있습니다)
  @Get('standings/sync')
  async syncStandings() {
    return await this.footballService.fetchAndSaveStandings();
  }

  // 대시보드 메인 화면용 (최신 2024 시즌 상위 6팀 등)
  @Get('standings/latest')
  async getLatestStandings() {
    return await this.footballService.getLatestStandings();
  }

  // 모달 창용 (특정 연도/리그 요청 시 해당 순위 반환)
  @Get('standings/history')
  async getHistoryStandings(
    @Query('season') season: number,
    @Query('league') leagueId: number,
  ) {
    return this.footballService.getHistoryStandings(Number(season), Number(leagueId));
  }

  @Get('news')
  async getNews() {
    return await this.footballService.getLatestNews();
  }
}

