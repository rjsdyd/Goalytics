import { Controller, Get, Param } from '@nestjs/common';
import { TeamsService } from './teams.service.js';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  findAllTeams() {
    return this.teamsService.findAllTeams();
  }

  @Get('leagues')
  findAllLeagues() {
    return this.teamsService.findAllLeagues();
  }

  @Get('league/:leagueId')
  findByLeague(@Param('leagueId') leagueId: string) {
    return this.teamsService.findByLeague(leagueId);
  }
}