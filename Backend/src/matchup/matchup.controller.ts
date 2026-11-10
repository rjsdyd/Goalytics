import { Controller, Get, Query } from '@nestjs/common';
import { MatchupService } from './matchup.service.js';

@Controller('matchup')
export class MatchupController {
  constructor(private readonly matchupService: MatchupService) {}

  @Get()
  async getMatchup(
    @Query('teamA') teamA: string,
    @Query('teamB') teamB: string,
    @Query('category') category: string,
  ) {
    return this.matchupService.getSimulation(teamA, teamB, category);
  }
}