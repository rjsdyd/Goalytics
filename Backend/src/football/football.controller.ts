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

  @Get('/fixtures')
  async getFixtures(@Query('date') date: string) {
    return await this.footballService.getFixturesByDate(date);
  }

  @Get('standings/sync')
  async syncStandings() {
    return await this.footballService.fetchAndSaveStandings();
  }

  @Get('standings/latest')
  async getLatestStandings() {
    return await this.footballService.getLatestStandings();
  }
  

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

