import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { AiService } from './ai.service.js';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  // API: GET /ai/tactics?team=맨체스터 시티
  @Get('tactics')
  async getTactics(@Query('team') team: string) {
    if (!team) {
      throw new BadRequestException('분석할 팀 이름(team 파라미터)이 필요합니다.');
    }
    
    return this.aiService.getTacticalBriefing(team);
  }
}