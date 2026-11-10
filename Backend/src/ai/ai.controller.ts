import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { AiService } from './ai.service.js';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Get('tactics')
  async getTactics(@Query('team') team: string) {
    // 유효성 검사: 파라미터 누락 및 공백만 있는 요청 차단
    if (!team || team.trim() === '') {
      throw new BadRequestException('분석할 팀 이름을 입력해 주세요.');
    }
    
    return this.aiService.getTacticalBriefing(team.trim());
  }
}