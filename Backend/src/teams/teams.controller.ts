// 백엔드 프로젝트: src/teams/teams.controller.ts

import { Controller, Get, Param } from '@nestjs/common';
import { TeamsService } from './teams.service.js';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  // ✅ 리그 목록 API 추가
  @Get('leagues')
  findAllLeagues() {
    return this.teamsService.findAllLeagues();
  }

  @Get('league/:leagueId')
  findByLeague(@Param('leagueId') leagueId: string) {
    return this.teamsService.findByLeague(leagueId);
  }
}